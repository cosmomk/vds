import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteFabricCatalog } from '@shtorivdom/site-kit';
import { ShowroomLeadSectionComponent } from '../../components/showroom-lead-section.component';

// Сгенерировано tools/mockups/site-to-angular.mjs из mockups/site/fabrics/index.html
@Component({
  selector: 'app-fabrics-page',
  templateUrl: './page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, SiteFabricCatalog, ShowroomLeadSectionComponent],
})
export class FabricsPage {}
