import { Component, ChangeDetectionStrategy, inject, computed, input } from '@angular/core'

import { PlayerStatus } from '@core/models'
import { AudioState } from '@core/state'

@Component({
  selector: 'gachi-play-label',
  templateUrl: './play-label.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayLabelComponent {
  private readonly audioState = inject(AudioState)

  readonly isPlaying = input(false)

  readonly label = computed(() => {
    if (!this.isPlaying()) {
      return 'Play'
    }

    switch (this.audioState.status()) {
      case PlayerStatus.Playing:
        return 'Pause'
      case PlayerStatus.Paused:
      default:
        return 'Play'
    }
  })
}
