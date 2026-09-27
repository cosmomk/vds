import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { MockupRuntime } from '../../../mockup-runtime';
import { Landing5Block1 } from './blocks/block-1';
import { Landing5Block2 } from './blocks/block-2';
import { Landing5Block3 } from './blocks/block-3';
import { Landing5Block4 } from './blocks/block-4';
import { Landing5Block5 } from './blocks/block-5';

@Component({
  selector: 'app-landing-5',
  imports: [Landing5Block1, Landing5Block2, Landing5Block3, Landing5Block4, Landing5Block5],
  templateUrl: './index.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
})
export class Landing5Page implements AfterViewInit, OnDestroy {
  private readonly runtime = inject(MockupRuntime);

  public ngAfterViewInit(): void {
    this.runtime.mount('landing-5', ["/legacy/shared/fonts.css","/legacy/landing-5/tailwind.generated.css","https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600;1,700&family=Raleway:wght@300;400;500;600;700&display=swap","https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=Raleway:wght@300;400;500;600;700&display=swap"], ["/legacy/shared/page.js","/landings/landing-5/app.js"]);
  }

  public ngOnDestroy(): void {
    this.runtime.unmount();
  }
}
