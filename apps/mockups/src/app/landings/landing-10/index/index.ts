import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { MockupRuntime } from '../../../mockup-runtime';
import { Landing10Block1 } from './blocks/block-1';
import { Landing10Block2 } from './blocks/block-2';
import { Landing10Block3 } from './blocks/block-3';
import { Landing10Block4 } from './blocks/block-4';
import { Landing10Block5 } from './blocks/block-5';
import { Landing10Block6 } from './blocks/block-6';
import { Landing10Block7 } from './blocks/block-7';
import { Landing10Block8 } from './blocks/block-8';
import { Landing10Block9 } from './blocks/block-9';
import { Landing10Block10 } from './blocks/block-10';

@Component({
  selector: 'app-landing-10',
  imports: [Landing10Block1, Landing10Block2, Landing10Block3, Landing10Block4, Landing10Block5, Landing10Block6, Landing10Block7, Landing10Block8, Landing10Block9, Landing10Block10],
  templateUrl: './index.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
})
export class Landing10Page implements AfterViewInit, OnDestroy {
  private readonly runtime = inject(MockupRuntime);

  public ngAfterViewInit(): void {
    this.runtime.mount('landing-10', ["/legacy/shared/fonts.css","/legacy/landing-10/tailwind.generated.css","https://fonts.googleapis.com/css2?family=PT+Serif&family=Montserrat:wght@400;500&display=swap"], ["/landings/landing-10/app.js"]);
  }

  public ngOnDestroy(): void {
    this.runtime.unmount();
  }
}
