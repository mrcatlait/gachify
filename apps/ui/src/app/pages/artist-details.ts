import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { ArtistDetailsModule } from '@features/artist-details'

@Component({
  standalone: true,
  selector: 'gachi-artist-details-page',
  template: '<gachi-artist-details [artistId]="id" />',
  imports: [ArtistDetailsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistDetailsPage {
  @Input() id: string
}
