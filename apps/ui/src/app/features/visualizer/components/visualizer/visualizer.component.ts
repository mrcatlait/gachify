import { ChangeDetectionStrategy, Component, inject } from '@angular/core'

import { UIState } from '@core/state'

@Component({
  selector: 'gachi-visualizer',
  templateUrl: 'visualizer.component.html',
  styleUrls: ['visualizer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualizerComponent {
  private readonly uiState = inject(UIState)

  handleClose(): void {
    this.uiState.closeVisualizer()
  }
}
