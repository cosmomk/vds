import { RouterLink } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactLinksDirective } from '../contact-links.directive';
import { SITE_LEGAL_DETAILS } from '../site-legal-details';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ContactLinksDirective],
  host: { class: 'block' },
})
export class SiteFooter {
  protected readonly legalDetails = SITE_LEGAL_DETAILS;
}
