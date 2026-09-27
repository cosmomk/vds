import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { MockupRuntime } from '../../../mockup-runtime';
import { Landing3Block1 } from './blocks/block-1';
import { Landing3Block2 } from './blocks/block-2';
import { Landing3Block3 } from './blocks/block-3';
import { Landing3Block4 } from './blocks/block-4';
import { Landing3Block5 } from './blocks/block-5';
import { Landing3Block6 } from './blocks/block-6';

@Component({
  selector: 'app-landing-3',
  imports: [Landing3Block1, Landing3Block2, Landing3Block3, Landing3Block4, Landing3Block5, Landing3Block6],
  templateUrl: './index.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
})
export class Landing3Page implements AfterViewInit, OnDestroy {
  private readonly runtime = inject(MockupRuntime);

  public ngAfterViewInit(): void {
    this.runtime.mount('landing-3', ["/legacy/shared/fonts.css","/legacy/landing-3/tailwind.generated.css","https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Cinzel+Decorative:wght@400;700;900&family=Raleway:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap"], ["/legacy/shared/page.js","/landings/landing-3/app.js"]);
  }

  public ngOnDestroy(): void {
    this.runtime.unmount();
  }
}
