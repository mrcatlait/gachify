import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
  ViewEncapsulation,
  computed,
  effect,
  inject,
} from '@angular/core'

import { Queue, Remix } from '@core/models'
import { PlaybackState } from '@core/state'
import { remixListItemSelectors } from '@selectors'

@Component({
  selector: 'gachi-remix-list-item',
  templateUrl: './remix-list-item.component.html',
  styleUrl: './remix-list-item.component.scss',
  // eslint-disable-next-line @angular-eslint/use-component-view-encapsulation
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemixListItemComponent {
  private readonly playbackState = inject(PlaybackState)
  private readonly renderer = inject(Renderer2)
  private readonly elementRef = inject(ElementRef)

  @Input({ required: true }) remix: Remix
  @Input() queue?: Queue

  readonly selectors = remixListItemSelectors

  @HostBinding('attr.data-test') selector = this.selectors.remixListItemContainer

  readonly currentRemixId = this.playbackState.currentRemixId
  readonly isCurrentRemix = computed(
    () => this.currentRemixId() === `${this.queue?.source.entityId ?? this.remix.id}:${this.remix.id}`,
  )

  constructor() {
    effect(() => {
      const action = this.isCurrentRemix() ? 'addClass' : 'removeClass'

      this.renderer[action](this.elementRef.nativeElement, 'gachi-remix-list-item-active')
    })
  }

  handleTogglePlay(): void {
    this.playbackState.togglePlay({ queue: this.getQueue(), remixId: this.remix.id })
  }

  private getQueue(): Queue {
    if (this.queue) {
      return this.queue
    }

    return {
      source: {
        entityId: this.remix.id,
        name: this.remix.title,
      },
      remixes: [this.remix],
    }
  }
}
