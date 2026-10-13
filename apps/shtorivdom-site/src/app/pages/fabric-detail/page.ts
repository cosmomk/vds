import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SITE_CATALOG, SITE_FABRICS, SiteFabric } from '@shtorivdom/site-kit';
import { ShowroomLeadSectionComponent } from '../../components/showroom-lead-section.component';

@Component({
  selector: 'app-fabric-detail-page',
  templateUrl: './page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ShowroomLeadSectionComponent],
})
export class FabricDetailPage {
  private readonly route = inject(ActivatedRoute);
  protected readonly fabric = this.resolveFabric();

  protected catalogTitle(key: string): string {
    const item = SITE_CATALOG.find((section) => section.key === key);
    if (!item) throw new Error(`Нет раздела каталога тканей: ${key}`);
    return item.title;
  }

  private resolveFabric(): SiteFabric {
    const key = this.route.snapshot.data['fabricKey'];
    const fabric =
      typeof key === 'string' ? SITE_FABRICS.find((item) => item.key === key) : undefined;
    if (!fabric) throw new Error(`Не найдена ткань для страницы: ${String(key)}`);
    return fabric;
  }
}
