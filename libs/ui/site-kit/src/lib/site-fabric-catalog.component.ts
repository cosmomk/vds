import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_FABRICS } from './data';

@Component({
  selector: 'site-fabric-catalog',
  templateUrl: './site-fabric-catalog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class SiteFabricCatalog {
  protected readonly fabrics = SITE_FABRICS;
}
