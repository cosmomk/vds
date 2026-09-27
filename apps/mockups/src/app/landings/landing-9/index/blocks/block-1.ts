import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MockupScrollEffectsDirective } from '../../../../mockup-scroll-effects.directive';

@Component({
  selector: 'nav[landing-9-block-1]',
  templateUrl: './block-1.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MockupScrollEffectsDirective],
})
export class Landing9Block1 {}
