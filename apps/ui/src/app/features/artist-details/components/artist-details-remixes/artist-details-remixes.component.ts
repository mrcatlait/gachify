import { ChangeDetectionStrategy, Component, inject } from '@angular/core'

import { PlaybackState } from '@core/state'
import { ArtistDetailsState } from '@features/artist-details/state'
import { artistDetailsSelectors } from '@selectors'

@Component({
  selector: 'gachi-artist-details-remixes',
  templateUrl: './artist-details-remixes.component.html',
  styleUrl: './artist-details-remixes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistDetailsRemixesComponent {
  private readonly playbackState = inject(PlaybackState)
  private readonly artistDetailsState = inject(ArtistDetailsState)

  readonly remixes = this.artistDetailsState.remixes
  readonly queue = this.artistDetailsState.queue
  readonly loading = this.artistDetailsState.loading

  readonly currentRemixId = this.playbackState.currentRemixId

  readonly selectors = artistDetailsSelectors

  numSequence(n: number): Array<number> {
    return Array(n)
  }
}
