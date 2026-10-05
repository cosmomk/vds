import { LeadFormComponent } from '../../forms/lead-form.component';
import { DesignerLeadFormComponent } from '../../forms/designer-lead-form.component';
import { RouterLink } from '@angular/router';
import { CounterDirective } from '../../components/reveal.directive';
import { RevealDirective } from '../../components/reveal.directive';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactLinksDirective } from '../../contact-links.directive';
import { SITE_SETTINGS } from '../../site-settings';
import {
  formatSiteMinimumPrice,
  SITE_FAQ,
  SITE_ORDER_AVAILABILITY_NOTE,
  SITE_PRICE_CONFIG,
  SITE_PRICES,
  SITE_TIERS,
  SiteBeforeAfter,
  SiteClients,
  SiteFaq,
  SiteIcon,
  SitePriceConfigSection,
  SitePriceSection,
  SiteReviewSlider,
} from '@shtorivdom/site-kit';

// Сгенерировано tools/mockups/site-to-angular.mjs из mockups/site/index.html
@Component({
  selector: 'app-home-page',
  templateUrl: './page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LeadFormComponent,
    DesignerLeadFormComponent,
    SiteBeforeAfter,
    SiteClients,
    SiteReviewSlider,
    RouterLink,
    CounterDirective,
    RevealDirective,
    SiteFaq,
    SiteIcon,
    ContactLinksDirective,
  ],
})
export class HomePage {
  protected readonly settings = SITE_SETTINGS;
  protected readonly faq = SITE_FAQ;
  protected readonly availabilityNote = SITE_ORDER_AVAILABILITY_NOTE;
  protected readonly tiers = SITE_TIERS;
  protected readonly prices = SITE_PRICE_CONFIG.sections;
  protected readonly priceSections = Object.fromEntries(
    SITE_PRICES.map((section) => [section.key, section]),
  ) as Record<string, SitePriceSection>;
  protected readonly minimumPriceLabel = (section: SitePriceConfigSection): string =>
    formatSiteMinimumPrice(section);
}
