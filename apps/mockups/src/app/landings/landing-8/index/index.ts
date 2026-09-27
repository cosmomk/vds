import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { MockupRuntime } from '../../../mockup-runtime';
import { Landing8Block1 } from './blocks/block-1';
import { Landing8Block2 } from './blocks/block-2';
import { Landing8Block3 } from './blocks/block-3';
import { Landing8Block4 } from './blocks/block-4';
import { Landing8Block5 } from './blocks/block-5';
import { Landing8Block6 } from './blocks/block-6';
import { Landing8Block7 } from './blocks/block-7';
import { Landing8Block8 } from './blocks/block-8';
import { Landing8Block9 } from './blocks/block-9';
import { Landing8Block10 } from './blocks/block-10';
import { Landing8Block11 } from './blocks/block-11';
import { Landing8Block12 } from './blocks/block-12';

@Component({
  selector: 'app-landing-8',
  imports: [Landing8Block1, Landing8Block2, Landing8Block3, Landing8Block4, Landing8Block5, Landing8Block6, Landing8Block7, Landing8Block8, Landing8Block9, Landing8Block10, Landing8Block11, Landing8Block12],
  templateUrl: './index.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
})
export class Landing8Page implements AfterViewInit, OnDestroy {
  private readonly runtime = inject(MockupRuntime);

  public ngAfterViewInit(): void {
    this.runtime.mount('landing-8', ["/legacy/shared/fonts.css","/legacy/landing-8/tailwind.generated.css","https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Poppins:wght@300;400;500;600&display=swap"], ["/legacy/shared/page.js","/landings/landing-8/app.js"]);
  }

  public ngOnDestroy(): void {
    this.runtime.unmount();
  }
}
