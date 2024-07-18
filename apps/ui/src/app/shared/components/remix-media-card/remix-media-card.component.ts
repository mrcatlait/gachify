import { ChangeDetectionStrategy, Component, Input, computed, inject } from '@angular/core'

import { Queue, Remix } from '@core/models'
import { PlaybackState } from '@core/state'
import { remixCardSelectors } from '@selectors'

@Component({
  selector: 'gachi-remix-media-card',
  templateUrl: './remix-media-card.component.html',
  styleUrl: './remix-media-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemixMediaCardComponent {
  private readonly playbackState = inject(PlaybackState)

  @Input({ required: true }) remix: Remix
  @Input({ required: true }) queue: Queue

  readonly selectors = remixCardSelectors

  readonly currentRemixId = this.playbackState.currentRemixId
  readonly isCurrentRemix = computed(() => this.currentRemixId() === `${this.queue.source.entityId}:${this.remix.id}`)

  handleTogglePlay(): void {
    this.playbackState.togglePlay({ queue: this.queue, remixId: this.remix.id })
  }
}
