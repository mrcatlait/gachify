import { ChangeDetectionStrategy, Component, Renderer2, effect, inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'

import { HeaderComponent } from '../header/header.component'

import { PlayerModule } from '@features/player'
import { AudioState, UIState } from '@core/state'
import { VisualizerModule } from '@features/visualizer'
import { SharedModule } from '@shared/shared.module'

@Component({
  standalone: true,
  selector: 'gachi-default-layout',
  templateUrl: 'default-layout.component.html',
  styleUrls: ['default-layout.component.scss'],
  imports: [SharedModule, HeaderComponent, PlayerModule, VisualizerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultLayoutComponent {
  private readonly audioState = inject(AudioState)
  private readonly uiState = inject(UIState)
  private readonly renderer = inject(Renderer2)
  private readonly document = inject(DOCUMENT)

  readonly playerActive = this.audioState.active
  readonly isVisualizerOpen = this.uiState.isVisualizerOpen

  constructor() {
    effect(() => {
      if (this.isVisualizerOpen()) {
        this.renderer.setStyle(this.document.body, 'overflow', 'hidden')
      } else {
        this.renderer.setStyle(this.document.body, 'overflow', 'auto')
      }
    })
  }
}
