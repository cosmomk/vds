import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MockupRevealDirective } from '../../../../mockup-reveal.directive';


@Component({
  selector: 'section[landing-10-block-3]',
  templateUrl: './block-3.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MockupRevealDirective],
})
export class Landing10Block3 {}
