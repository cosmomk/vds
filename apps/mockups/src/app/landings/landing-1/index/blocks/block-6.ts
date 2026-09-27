import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MockupRevealDirective } from '../../../../mockup-reveal.directive';


@Component({
  selector: 'section[landing-1-block-6]',
  templateUrl: './block-6.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MockupRevealDirective],
})
export class Landing1Block6 {}
