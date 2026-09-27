import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MockupRevealDirective } from '../../../../mockup-reveal.directive';


@Component({
  selector: 'section[landing-10-block-8]',
  templateUrl: './block-8.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MockupRevealDirective],
})
export class Landing10Block8 {}
