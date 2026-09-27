import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MockupScrollEffectsDirective } from '../../../../mockup-scroll-effects.directive';

@Component({
  selector: 'section[landing-6-block-2]',
  templateUrl: './block-2.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MockupScrollEffectsDirective],
})
export class Landing6Block2 {}
