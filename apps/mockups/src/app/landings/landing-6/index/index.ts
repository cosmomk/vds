import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { MockupRuntime } from '../../../mockup-runtime';
import { Landing6Block1 } from './blocks/block-1';
import { Landing6Block2 } from './blocks/block-2';
import { Landing6Block3 } from './blocks/block-3';
import { Landing6Block4 } from './blocks/block-4';
import { Landing6Block5 } from './blocks/block-5';
import { Landing6Block6 } from './blocks/block-6';
import { Landing6Block7 } from './blocks/block-7';
import { Landing6Block8 } from './blocks/block-8';
import { Landing6Block9 } from './blocks/block-9';

@Component({
  selector: 'app-landing-6',
  imports: [Landing6Block1, Landing6Block2, Landing6Block3, Landing6Block4, Landing6Block5, Landing6Block6, Landing6Block7, Landing6Block8, Landing6Block9],
  templateUrl: './index.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
})
export class Landing6Page implements AfterViewInit, OnDestroy {
  private readonly runtime = inject(MockupRuntime);

  public ngAfterViewInit(): void {
    this.runtime.mount('landing-6', ["/legacy/shared/fonts.css","/legacy/landing-6/tailwind.generated.css","https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,700;0,6..96,900;1,6..96,400;1,6..96,700&family=Jost:wght@300;400;500;600&display=swap"], ["/legacy/shared/page.js","/landings/landing-6/app.js"]);
  }

  public ngOnDestroy(): void {
    this.runtime.unmount();
  }
}
