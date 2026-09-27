import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MockupRevealDirective } from '../../../../mockup-reveal.directive';

import { MockupScrollEffectsDirective } from '../../../../mockup-scroll-effects.directive';

@Component({
  selector: 'div[landing-3-block-1]',
  templateUrl: './block-1.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MockupRevealDirective, MockupScrollEffectsDirective],
})
export class Landing3Block1 {}
