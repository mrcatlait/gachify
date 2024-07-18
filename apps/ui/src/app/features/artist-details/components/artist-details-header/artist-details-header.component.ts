import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core'

import { PlaybackState } from '@core/state'
import { ArtistDetailsState } from '@features/artist-details/state'
import { artistDetailsSelectors } from '@selectors'

@Component({
  selector: 'gachi-artist-details-header',
  templateUrl: './artist-details-header.component.html',
  styleUrl: './artist-details-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistDetailsHeaderComponent {
  private readonly artistDetailsState = inject(ArtistDetailsState)
  private readonly playbackState = inject(PlaybackState)

  readonly selectors = artistDetailsSelectors

  readonly artist = this.artistDetailsState.artist
  readonly total = this.artistDetailsState.total
  readonly queue = this.artistDetailsState.queue

  readonly isPlaying = computed(() => this.queue().source.entityId === this.playbackState.queueSourceId())
  readonly currentRemixId = computed(() => (this.isPlaying() ? this.playbackState.currentRemixId() : ''))

  handleTogglePlay() {
    this.playbackState.togglePlay({ queue: this.queue(), remixId: this.currentRemixId() })
  }
}
