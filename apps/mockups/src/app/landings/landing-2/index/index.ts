import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { MockupRuntime } from '../../../mockup-runtime';
import { Landing2Block1 } from './blocks/block-1';
import { Landing2Block2 } from './blocks/block-2';
import { Landing2Block3 } from './blocks/block-3';
import { Landing2Block4 } from './blocks/block-4';
import { Landing2Block5 } from './blocks/block-5';
import { Landing2Block6 } from './blocks/block-6';
import { Landing2Block7 } from './blocks/block-7';
import { Landing2Block8 } from './blocks/block-8';
import { Landing2Block9 } from './blocks/block-9';
import { Landing2Block10 } from './blocks/block-10';
import { Landing2Block11 } from './blocks/block-11';
import { Landing2Block12 } from './blocks/block-12';

@Component({
  selector: 'app-landing-2',
  imports: [Landing2Block1, Landing2Block2, Landing2Block3, Landing2Block4, Landing2Block5, Landing2Block6, Landing2Block7, Landing2Block8, Landing2Block9, Landing2Block10, Landing2Block11, Landing2Block12],
  templateUrl: './index.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
})
export class Landing2Page implements AfterViewInit, OnDestroy {
  private readonly runtime = inject(MockupRuntime);

  public ngAfterViewInit(): void {
    this.runtime.mount('landing-2', ["/legacy/shared/fonts.css","/legacy/landing-2/tailwind.generated.css","https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Lato:wght@300;400;700&display=swap"], ["/legacy/shared/page.js","/landings/landing-2/app.js"]);
  }

  public ngOnDestroy(): void {
    this.runtime.unmount();
  }
}
