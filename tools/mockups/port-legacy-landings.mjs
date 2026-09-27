import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, serialize } from 'parse5';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const legacyRoot = path.join(repoRoot, 'apps/mockups/public/legacy');
const outputRoot = path.join(repoRoot, 'apps/mockups/src/app/landings');
const preview = process.argv.includes('--dry-run');
const overwriteGenerated = process.argv.includes('--overwrite-generated');
const blockTags = new Set(['nav', 'header', 'section', 'main', 'footer']);
const ignoredTags = new Set(['script', 'style']);
const voidTags = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);

function children(node) {
  return (node.childNodes ?? []).filter(
    (child) => child.tagName && !ignoredTags.has(child.tagName),
  );
}

function find(node, predicate) {
  if (predicate(node)) return node;
  for (const child of node.childNodes ?? []) {
    const result = find(child, predicate);
    if (result) return result;
  }
  return undefined;
}

function semanticCount(node) {
  return children(node).filter((child) => blockTags.has(child.tagName)).length;
}

function findBlockContainer(body) {
  const candidates = [];
  function visit(node, depth = 0) {
    if (!node.tagName || ignoredTags.has(node.tagName)) return;
    const count = semanticCount(node);
    if (count >= 3) candidates.push({ node, depth, score: count * 100 + children(node).length });
    for (const child of node.childNodes ?? []) visit(child, depth + 1);
  }
  visit(body);
  candidates.sort((a, b) => b.score - a.score || a.depth - b.depth);
  if (candidates[0]) return candidates[0].node;

  const appRoot = find(
    body,
    (node) =>
      node.tagName === 'div' &&
      (node.attrs ?? []).some((attribute) => attribute.name === 'id' && attribute.value === 'root'),
  );
  if (appRoot) {
    const rootChildren = children(appRoot);
    if (rootChildren.length === 1) return rootChildren[0];
    return appRoot;
  }

  return body;
}

function readAttribute(node, name) {
  return (node.attrs ?? []).find((attribute) => attribute.name === name)?.value;
}

function removeRuntimeNodes(node) {
  node.childNodes = (node.childNodes ?? []).filter((child) => !ignoredTags.has(child.tagName));
  for (const child of node.childNodes) removeRuntimeNodes(child);
}

function pageResources(pageName, html) {
  const ast = parse(html);
  const head = find(ast, (node) => node.tagName === 'head');
  const body = find(ast, (node) => node.tagName === 'body');
  const styles = [];
  const scripts = [];
  function visit(node) {
    if (
      node.tagName === 'link' &&
      (readAttribute(node, 'rel') ?? '').split(/\s+/).includes('stylesheet')
    ) {
      const href = readAttribute(node, 'href');
      if (href) styles.push(resolveResource(pageName, href));
    }
    if (node.tagName === 'script') {
      const src = readAttribute(node, 'src');
      if (src) scripts.push(resolveResource(pageName, src));
    }
    for (const child of node.childNodes ?? []) visit(child);
  }
  visit(head ?? ast);
  visit(body ?? ast);

  const generatedCss = `/legacy/${pageName}/tailwind.generated.css`;
  const fontsCss = '/legacy/shared/fonts.css';
  return {
    styles: [...new Set([fontsCss, generatedCss, ...styles])],
    scripts: [...new Set(scripts)],
  };
}

function prepareAngularScripts(pageName, sourceScripts) {
  const scripts = [];
  const files = [];
  for (const source of sourceScripts) {
    if (source !== `/legacy/${pageName}/app.js`) {
      scripts.push(source);
      continue;
    }

    const sourcePath = path.join(legacyRoot, pageName, 'app.js');
    const targetPath = path.join(repoRoot, 'apps/mockups/public/landings', pageName, 'app.js');
    const copiedScript = fs
      .readFileSync(sourcePath, 'utf8')
      .replace(
        /(['"`])(?:\.\.\/)+(assets|avatars|shared)\//g,
        (_, quote, folder) => `${quote}/legacy/${folder}/`,
      )
      .replace(/(['"`])(?:\.\/)?images\//g, (_, quote) => `${quote}/legacy/${pageName}/images/`);
    scripts.push(`/landings/${pageName}/app.js`);
    files.push([targetPath, copiedScript]);
  }
  return { scripts, files };
}

function resolveResource(pageName, value) {
  if (/^(?:[a-z]+:|\/|#|data:|blob:)/i.test(value)) return value;
  return path.posix.join('/legacy', pageName, value);
}

function rewriteLocalUrls(fragment, pageName) {
  const rewrite = (value) => {
    const trimmed = value.trim();
    if (!trimmed || /^(?:[a-z]+:|\/|#|data:|blob:|javascript:)/i.test(trimmed)) return value;
    const separator = trimmed.search(/[?#]/);
    const pathname = separator < 0 ? trimmed : trimmed.slice(0, separator);
    const suffix = separator < 0 ? '' : trimmed.slice(separator);
    return `${path.posix.join('/legacy', pageName, pathname)}${suffix}`;
  };

  return fragment
    .replace(/\b(src|href|poster|data-src)=(['"])(.*?)\2/gi, (match, attribute, quote, value) => {
      if (attribute.toLowerCase() === 'href' && value.startsWith('#')) return match;
      return `${attribute}=${quote}${rewrite(value)}${quote}`;
    })
    .replace(
      /url\((['"]?)(.*?)\1\)/gi,
      (match, quote, value) => `url(${quote}${rewrite(value)}${quote})`,
    )
    .replaceAll('@', '&#64;');
}

function removeTruncatedStartTags(html) {
  return html.replace(
    /<([a-z][a-z\d-]*)\b(?:(?!<)[\s\S])*?…\d+ tokens truncated…(?:(?!<)[\s\S])*?>/gi,
    '<$1>',
  );
}

function wrapOrphanSvgPaths(fragment) {
  let svgDepth = 0;
  let wrappingPath = false;
  return fragment.replace(/<\/?svg\b[^>]*>|<path\b[^>]*>|<\/path>/gi, (tag) => {
    if (/^<svg\b/i.test(tag)) {
      svgDepth += 1;
      return tag;
    }
    if (/^<\/svg/i.test(tag)) {
      svgDepth = Math.max(0, svgDepth - 1);
      return tag;
    }
    if (/^<path\b/i.test(tag) && svgDepth === 0) {
      wrappingPath = true;
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${tag}`;
    }
    if (/^<\/path/i.test(tag) && wrappingPath) {
      wrappingPath = false;
      return `${tag}</svg>`;
    }
    return tag;
  });
}

function componentNames(pageNumber, blockNumber) {
  return `Landing${pageNumber}Block${blockNumber}`;
}

function buildPage(pageName) {
  const sourcePath = path.join(legacyRoot, pageName, 'index.html');
  const source = removeTruncatedStartTags(fs.readFileSync(sourcePath, 'utf8'));
  const ast = parse(source, { sourceCodeLocationInfo: true });
  const body = find(ast, (node) => node.tagName === 'body');
  if (!body) throw new Error(`${pageName}: в исходнике не найден body`);

  removeRuntimeNodes(body);
  const container = findBlockContainer(body);
  const candidates = children(container).filter((node) => !voidTags.has(node.tagName));
  if (!candidates.length) throw new Error(`${pageName}: не удалось найти блоки страницы`);

  const pageNumber = pageName.slice('landing-'.length);
  const pageDirectory = path.join(outputRoot, pageName);
  const indexDirectory = path.join(pageDirectory, 'index');
  const existingPage = path.join(indexDirectory, 'index.ts');
  const previousGeneratedPage = path.join(pageDirectory, 'index.ts');
  const isGeneratedPage = [existingPage, previousGeneratedPage].some(
    (file) =>
      fs.existsSync(file) && fs.readFileSync(file, 'utf8').includes(`selector: 'app-${pageName}'`),
  );
  if (
    fs.existsSync(pageDirectory) &&
    fs.readdirSync(pageDirectory).length > 0 &&
    !(overwriteGenerated && isGeneratedPage)
  ) {
    throw new Error(
      `${pageName}: Angular-папка уже существует; генерация остановлена без перезаписи`,
    );
  }

  const imports = [];
  const blockClasses = [];

  candidates.forEach((node, index) => {
    const blockNumber = index + 1;
    const className = componentNames(pageNumber, blockNumber);
    const attributeName = `landing-${pageNumber}-block-${blockNumber}`;
    const blockFile = `block-${blockNumber}`;
    const selector = `${node.tagName}[${attributeName}]`;
    const contentFragment = { nodeName: '#document-fragment', childNodes: node.childNodes };
    let innerHtml = wrapOrphanSvgPaths(rewriteLocalUrls(serialize(contentFragment), pageName));
    const usesReveal = /\bdata-reveal\b|\bdata-inview\b|section-reveal/.test(innerHtml);
    const usesScrollEffects = /\bdata-parallax\b|\bdata-remove-after\b|\bdata-scrolled\b/.test(
      innerHtml,
    );
    const revealImport = usesReveal
      ? "import { MockupRevealDirective } from '../../../../mockup-reveal.directive';\n"
      : '';
    const scrollImport = usesScrollEffects
      ? "import { MockupScrollEffectsDirective } from '../../../../mockup-scroll-effects.directive';\n"
      : '';
    const angularImports = [
      usesReveal && 'MockupRevealDirective',
      usesScrollEffects && 'MockupScrollEffectsDirective',
    ].filter(Boolean);
    const componentImports = angularImports.length
      ? `  imports: [${angularImports.join(', ')}],\n`
      : '';

    const blockTs = `import { ChangeDetectionStrategy, Component } from '@angular/core';
${revealImport}
${scrollImport}
@Component({
  selector: '${selector}',
  templateUrl: './${blockFile}.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
${componentImports}})
export class ${className} {}
`;

    blockClasses.push(className);
    imports.push(`import { ${className} } from './blocks/${blockFile}';`);
    node.attrs.push({ name: attributeName, value: '' });
    node.childNodes = [];
    blockClasses[blockClasses.length - 1] = { className, blockTs, blockFile, innerHtml };
  });

  const bodyFragment = { nodeName: '#document-fragment', childNodes: body.childNodes };
  let template = rewriteLocalUrls(serialize(bodyFragment), pageName);
  const bodyClass = readAttribute(body, 'class');
  const bodyStyle = readAttribute(body, 'style');
  const wrapperAttributes = [
    bodyClass && `class="${bodyClass}"`,
    bodyStyle && `style="${bodyStyle}"`,
  ]
    .filter(Boolean)
    .join(' ');
  template = `<div ${wrapperAttributes} data-landing-root="${pageName}">
${template.trim()}
</div>
`;

  const resourceConfig = pageResources(pageName, source);
  const angularScripts = prepareAngularScripts(pageName, resourceConfig.scripts);
  resourceConfig.scripts = angularScripts.scripts;
  const pageTs = `import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { MockupRuntime } from '../../../mockup-runtime';
${imports.join('\n')}

@Component({
  selector: 'app-${pageName}',
  imports: [${blockClasses.map((block) => block.className).join(', ')}],
  templateUrl: './index.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
})
export class Landing${pageNumber}Page implements AfterViewInit, OnDestroy {
  private readonly runtime = inject(MockupRuntime);

  public ngAfterViewInit(): void {
    this.runtime.mount('${pageName}', ${JSON.stringify(resourceConfig.styles)}, ${JSON.stringify(resourceConfig.scripts)});
  }

  public ngOnDestroy(): void {
    this.runtime.unmount();
  }
}
`;

  const title =
    find(ast, (node) => node.tagName === 'title')
      ?.childNodes?.map((node) => node.value ?? '')
      .join('')
      .trim() ?? pageName;
  const description = `Angular-структура исходного мокапа «${title}»: внешняя композиция делится на компоненты-блоки; оригинал и локальные ресурсы остаются в public/legacy/${pageName}.`;
  const landingDoc = `# ${pageName}\n\n- Источник: собственный архивный мокап \`apps/mockups/public/legacy/${pageName}/index.html\`.\n- Angular-маршрут: \`/${pageName}\`.\n- Структура: \`index/index.ts\`, \`index/index.html\`, \`index/blocks/<block>.ts\` и соседний \`index/blocks/<block>.html\`.\n- Каждый визуальный блок реализован отдельным Angular-компонентом с обычным \`templateUrl\`; HTML не кодируется в TypeScript и не подгружается через fetch.\n- Визуальные состояния и интерактивность исходника должны быть перенесены в Angular-компоненты и директивы; оригинальные ресурсы архива остаются неизменными.\n- Все относительные ресурсы в шаблонах преобразованы в локальные адреса из \`/legacy/${pageName}/\`.\n- Источники стилей: ${resourceConfig.styles.map((value) => `\`${value}\``).join(', ')}.\n- Подлежащие переносу сценарии исходного JavaScript: ${resourceConfig.scripts.map((value) => `\`${value}\``).join(', ') || 'нет'}.\n`;

  return {
    pageName,
    pageDirectory,
    files: [
      [`${pageDirectory}/landing.md`, landingDoc],
      ...angularScripts.files,
      [`${indexDirectory}/index.ts`, pageTs],
      [`${indexDirectory}/index.html`, template],
      ...blockClasses.map(({ blockTs, blockFile }) => [
        `${indexDirectory}/blocks/${blockFile}.ts`,
        blockTs,
      ]),
      ...blockClasses.map(({ blockFile, innerHtml }) => [
        `${indexDirectory}/blocks/${blockFile}.html`,
        `${innerHtml.trim()}\n`,
      ]),
    ],
  };
}

const pages = fs
  .readdirSync(legacyRoot)
  .filter(
    (name) =>
      /^landing-\d+$/.test(name) && fs.existsSync(path.join(legacyRoot, name, 'index.html')),
  )
  .sort((a, b) => Number(a.slice(8)) - Number(b.slice(8)));

if (!pages.length) throw new Error('В public/legacy не найдены архивные лендинги');

const generated = pages.map(buildPage);
const generatedFiles = generated.flatMap((page) => page.files);
if (preview) {
  for (const page of generated) {
    console.log(
      `${page.pageName}: ${page.files.length} файлов Angular, ${page.files.filter(([file]) => file.endsWith('.ts')).length} компонентов`,
    );
  }
  console.log(`Всего подготовлено ${generatedFiles.length} файлов; изменений не записано.`);
} else {
  for (const [file, content] of generatedFiles) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content, 'utf8');
  }
  console.log(`Создано ${generatedFiles.length} файлов для ${generated.length} Angular-лендингов.`);
}
