import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MockupRuntime {
  private readonly document = inject(DOCUMENT);
  private readonly mounted: HTMLElement[] = [];

  public mount(page: string, styles: string[], scripts: string[]): void {
    this.unmount();
    this.document.body.dataset['mockupPage'] = page;

    for (const href of styles) {
      const link = this.document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.dataset['mockupPageAsset'] = page;
      this.document.head.append(link);
      this.mounted.push(link);
    }

    void this.loadScripts(scripts);
  }

  public unmount(): void {
    for (const element of this.mounted) element.remove();
    this.mounted.length = 0;

    delete this.document.body.dataset['mockupPage'];
  }

  private async loadScripts(sources: string[]): Promise<void> {
    for (const src of sources) {
      await new Promise<void>((resolve) => {
        const script = this.document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => resolve();
        this.document.body.append(script);
        this.mounted.push(script);
      });
    }
  }
}
