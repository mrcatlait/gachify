import { ChangeDetectionStrategy, Component, HostBinding, Input, computed, inject } from '@angular/core'

import { Queue, Remix } from '@core/models'
import { PlaybackState } from '@core/state'
import { remixCardSelectors } from '@selectors'

type Variant = 'elevated' | 'outlined' | 'default'

@Component({
  selector: 'gachi-remix-card',
  templateUrl: './remix-card.component.html',
  styleUrl: './remix-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemixCardComponent {
  private readonly playbackState = inject(PlaybackState)

  @Input({ required: true }) remix: Remix
  @Input({ required: true }) queue: Queue

  @HostBinding('class')
  @Input()
  variant: Variant = 'default'

  readonly selectors = remixCardSelectors

  readonly currentRemixId = this.playbackState.currentRemixId
  readonly isCurrentRemix = computed(() => this.currentRemixId() === `${this.queue.source.entityId}:${this.remix.id}`)

  handleTogglePlay(): void {
    this.playbackState.togglePlay({ queue: this.queue, remixId: this.remix.id })
  }
}
