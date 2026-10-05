import { LeadFormComponent } from '../../forms/lead-form.component';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../components/reveal.directive';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactLinksDirective } from '../../contact-links.directive';
import { SITE_LEGAL_DETAILS } from '../../site-legal-details';

// Сгенерировано tools/mockups/site-to-angular.mjs из mockups/site/privacy-policy/index.html
@Component({
  selector: 'app-privacy-policy-page',
  templateUrl: './page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LeadFormComponent, RouterLink, RevealDirective, ContactLinksDirective],
})
export class PrivacyPolicyPage {
  protected readonly legalDetails = SITE_LEGAL_DETAILS;
}
