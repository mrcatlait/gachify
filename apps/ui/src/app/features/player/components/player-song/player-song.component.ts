import { ChangeDetectionStrategy, Component, inject } from '@angular/core'

import { PlaybackState } from '@core/state'
import { playerSelectors } from '@selectors'

@Component({
  selector: 'gachi-player-song',
  templateUrl: 'player-song.component.html',
  styleUrls: ['player-song.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerSongComponent {
  private readonly playbackState = inject(PlaybackState)

  readonly selectors = playerSelectors

  readonly currentRemix = this.playbackState.currentRemix
}
