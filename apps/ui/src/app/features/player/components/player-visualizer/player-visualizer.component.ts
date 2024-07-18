import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core'

import { UIState } from '@core/state'
import { playerSelectors } from '@selectors'

@Component({
  selector: 'gachi-player-visualizer',
  templateUrl: 'player-visualizer.component.html',
  styleUrls: ['player-visualizer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerVisualizerComponent {
  private readonly uiState = inject(UIState)

  readonly icon = computed(() => (this.uiState.isVisualizerOpen() ? 'fullscreen_exit' : 'fullscreen'))

  readonly selectors = playerSelectors

  handleClick(): void {
    this.uiState.toggleVisualizer()
  }
}
