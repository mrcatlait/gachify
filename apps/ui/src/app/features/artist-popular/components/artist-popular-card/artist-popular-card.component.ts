import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { Artist } from '@core/models'

@Component({
  selector: 'gachi-artist-popular-card',
  templateUrl: './artist-popular-card.component.html',
  styleUrl: './artist-popular-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistPopularCardComponent {
  @Input({ required: true }) artist: Artist
}
