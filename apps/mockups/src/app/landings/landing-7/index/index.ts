import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { MockupRuntime } from '../../../mockup-runtime';
import { Landing7Block1 } from './blocks/block-1';
import { Landing7Block2 } from './blocks/block-2';
import { Landing7Block3 } from './blocks/block-3';

@Component({
  selector: 'app-landing-7',
  imports: [Landing7Block1, Landing7Block2, Landing7Block3],
  templateUrl: './index.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
})
export class Landing7Page implements AfterViewInit, OnDestroy {
  private readonly runtime = inject(MockupRuntime);

  public ngAfterViewInit(): void {
    this.runtime.mount('landing-7', ["/legacy/shared/fonts.css","/legacy/landing-7/tailwind.generated.css","https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap"], ["/legacy/shared/page.js","/landings/landing-7/app.js"]);
  }

  public ngOnDestroy(): void {
    this.runtime.unmount();
  }
}
