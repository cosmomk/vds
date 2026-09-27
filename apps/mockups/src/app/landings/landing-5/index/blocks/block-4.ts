import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MockupRevealDirective } from '../../../../mockup-reveal.directive';


@Component({
  selector: 'section[landing-5-block-4]',
  templateUrl: './block-4.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MockupRevealDirective],
})
export class Landing5Block4 {}
