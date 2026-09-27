import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { MockupRuntime } from '../../../mockup-runtime';
import { Landing9Block1 } from './blocks/block-1';
import { Landing9Block2 } from './blocks/block-2';
import { Landing9Block3 } from './blocks/block-3';
import { Landing9Block4 } from './blocks/block-4';
import { Landing9Block5 } from './blocks/block-5';
import { Landing9Block6 } from './blocks/block-6';
import { Landing9Block7 } from './blocks/block-7';
import { Landing9Block8 } from './blocks/block-8';
import { Landing9Block9 } from './blocks/block-9';
import { Landing9Block10 } from './blocks/block-10';
import { Landing9Block11 } from './blocks/block-11';
import { Landing9Block12 } from './blocks/block-12';
import { Landing9Block13 } from './blocks/block-13';
import { Landing9Block14 } from './blocks/block-14';
import { Landing9Block15 } from './blocks/block-15';

@Component({
  selector: 'app-landing-9',
  imports: [Landing9Block1, Landing9Block2, Landing9Block3, Landing9Block4, Landing9Block5, Landing9Block6, Landing9Block7, Landing9Block8, Landing9Block9, Landing9Block10, Landing9Block11, Landing9Block12, Landing9Block13, Landing9Block14, Landing9Block15],
  templateUrl: './index.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
})
export class Landing9Page implements AfterViewInit, OnDestroy {
  private readonly runtime = inject(MockupRuntime);

  public ngAfterViewInit(): void {
    this.runtime.mount('landing-9', ["/legacy/shared/fonts.css","/legacy/landing-9/tailwind.generated.css","https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap"], ["/legacy/shared/page.js","/landings/landing-9/app.js"]);
  }

  public ngOnDestroy(): void {
    this.runtime.unmount();
  }
}
