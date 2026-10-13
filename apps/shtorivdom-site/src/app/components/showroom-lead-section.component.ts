import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LeadFormComponent } from '../forms/lead-form.component';

@Component({
  selector: 'app-showroom-lead-section',
  templateUrl: './showroom-lead-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LeadFormComponent],
})
export class ShowroomLeadSectionComponent {}
