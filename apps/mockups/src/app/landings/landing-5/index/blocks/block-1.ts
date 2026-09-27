import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MockupRevealDirective } from '../../../../mockup-reveal.directive';

import { MockupScrollEffectsDirective } from '../../../../mockup-scroll-effects.directive';

@Component({
  selector: 'div[landing-5-block-1]',
  templateUrl: './block-1.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MockupRevealDirective, MockupScrollEffectsDirective],
})
export class Landing5Block1 {
  public readonly menuOpen = signal(false);

  public toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  public closeMenu(): void {
    this.menuOpen.set(false);
  }
}
