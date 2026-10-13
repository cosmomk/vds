import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CATALOG, SITE_FABRICS, SiteFabric } from './data';

@Component({
  selector: 'site-fabric-recommendations',
  templateUrl: './site-fabric-recommendations.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class SiteFabricRecommendations {
  readonly catalogKey = input.required<string>();

  protected readonly fabrics = computed(() =>
    SITE_FABRICS.filter((fabric) =>
      fabric.recommendations.some(
        (recommendation) => recommendation.catalogKey === this.catalogKey(),
      ),
    ),
  );
  protected readonly catalogTitle = computed(() => this.findCatalogTitle(this.catalogKey()));

  protected fitFor(fabric: SiteFabric): string {
    const recommendation = fabric.recommendations.find(
      (item) => item.catalogKey === this.catalogKey(),
    );
    if (!recommendation) throw new Error(`Нет рекомендации для ткани ${fabric.key}`);
    return recommendation.fit;
  }

  private findCatalogTitle(key: string): string {
    const section = SITE_CATALOG.find((item) => item.key === key);
    if (!section) throw new Error(`Нет раздела каталога тканей: ${key}`);
    return section.title;
  }
}
