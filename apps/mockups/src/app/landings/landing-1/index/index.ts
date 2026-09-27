import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { MockupRuntime } from '../../../mockup-runtime';
import { Landing1Block1 } from './blocks/block-1';
import { Landing1Block2 } from './blocks/block-2';
import { Landing1Block3 } from './blocks/block-3';
import { Landing1Block4 } from './blocks/block-4';
import { Landing1Block5 } from './blocks/block-5';
import { Landing1Block6 } from './blocks/block-6';
import { Landing1Block7 } from './blocks/block-7';
import { Landing1Block8 } from './blocks/block-8';

@Component({
  selector: 'app-landing-1',
  imports: [Landing1Block1, Landing1Block2, Landing1Block3, Landing1Block4, Landing1Block5, Landing1Block6, Landing1Block7, Landing1Block8],
  templateUrl: './index.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
})
export class Landing1Page implements AfterViewInit, OnDestroy {
  private readonly runtime = inject(MockupRuntime);

  public ngAfterViewInit(): void {
    this.runtime.mount('landing-1', ["/legacy/shared/fonts.css","/legacy/landing-1/tailwind.generated.css"], ["/legacy/shared/page.js","/landings/landing-1/app.js"]);
  }

  public ngOnDestroy(): void {
    this.runtime.unmount();
  }
}
