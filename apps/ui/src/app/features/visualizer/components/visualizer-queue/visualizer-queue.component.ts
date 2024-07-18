import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'

import { visualizerSelectors } from '@selectors'
import { PlaybackState } from '@core/state'

@Component({
  selector: 'gachi-visualizer-queue',
  templateUrl: 'visualizer-queue.component.html',
  styleUrl: 'visualizer-queue.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualizerQueueComponent {
  private readonly playbackState = inject(PlaybackState)
  private readonly document = inject(DOCUMENT)

  readonly currentRemixId = this.playbackState.currentRemixId
  readonly queue = this.playbackState.queue

  readonly selectors = visualizerSelectors

  constructor() {
    this.scrollToCurrentRemix()
  }

  private scrollToCurrentRemix(): void {
    effect(() => {
      const currentRemixId = this.currentRemixId()

      if (!currentRemixId) {
        return
      }

      const element = this.document.getElementById(currentRemixId)

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
      }
    })
  }
}
