import { Injectable, computed, inject, signal } from '@angular/core'

import { AudioState } from './audio.state'
import { UIState } from './ui.state'

import { Remix, Queue, RepeatOption, StateModel } from '@core/models'

interface PlaybackStateModel {
  currentRemix: Remix | null
  queue: Queue
  shuffle: boolean
  repeat: RepeatOption
}

@Injectable({
  providedIn: 'root',
})
export class PlaybackState implements StateModel<PlaybackStateModel> {
  private readonly audioState = inject(AudioState)
  private readonly uiState = inject(UIState)

  readonly currentRemix = signal<Remix | null>(null)
  readonly queue = signal<Queue>({ source: { name: '' }, remixes: [] })
  readonly shuffle = signal(false)
  readonly repeat = signal(RepeatOption.None)

  readonly hasPrevious = computed(
    () =>
      this.currentRemix() &&
      (this.queue().remixes.findIndex((remix) => remix.id === this.currentRemix()?.id) > 0 ||
        this.repeat() === RepeatOption.All),
  )

  readonly hasNext = computed(
    () =>
      this.currentRemix() &&
      (this.queue().remixes.findIndex((remix) => remix.id === this.currentRemix()?.id) <
        this.queue().remixes.length - 1 ||
        this.repeat() === RepeatOption.All),
  )

  readonly currentRemixId = computed(() => `${this.queue().source.entityId}:${this.currentRemix()?.id}`)
  readonly queueSourceId = computed(() => this.queue().source.entityId)

  togglePlay(payload: { queue: Queue; remixId?: string }): void {
    if (this.currentRemix()?.id === payload.remixId && this.queue().source.entityId === payload.queue.source.entityId) {
      this.audioState.togglePlay()
      return
    }

    let remix = payload.queue.remixes[0]

    if (payload.remixId) {
      remix = payload.queue.remixes.find((r) => r.id === payload.remixId) || remix
    }

    this.currentRemix.set(remix)

    if (
      this.queue().source.entityId !== payload.queue.source.entityId ||
      this.queue().source.name !== payload.queue.source.name
    ) {
      this.queue.set(payload.queue)
    }

    this.audioState.load({ remix })
    this.uiState.openVisualizer()
  }

  next(): void {
    const currentRemix = this.currentRemix()
    const queue = this.queue()

    if (!currentRemix) {
      return
    }

    const currentIndex = queue.remixes.findIndex((song) => song.id === currentRemix.id)
    let nextRemix: Remix

    if (currentIndex < queue.remixes.length - 1) {
      nextRemix = queue.remixes[currentIndex + 1]
    } else {
      nextRemix = queue.remixes[0]
    }

    this.currentRemix.set(nextRemix)
    this.audioState.load({ remix: nextRemix })
  }

  previous(): void {
    const currentRemix = this.currentRemix()
    const queue = this.queue()

    if (!currentRemix) {
      return
    }

    const currentIndex = queue.remixes.findIndex((remix) => remix.id === currentRemix.id)
    let previousRemix: Remix

    if (currentIndex > 0) {
      previousRemix = queue.remixes[currentIndex - 1]
    } else {
      previousRemix = queue.remixes[queue.remixes.length - 1]
    }

    this.currentRemix.set(previousRemix)
    this.audioState.load({ remix: previousRemix })
  }

  toggleRepeat(): void {
    switch (this.repeat()) {
      case RepeatOption.None:
        this.repeat.set(RepeatOption.All)
        break
      case RepeatOption.All:
        this.repeat.set(RepeatOption.Single)
        break
      case RepeatOption.Single:
      default:
        this.repeat.set(RepeatOption.None)
        break
    }
  }

  toggleShuffle(): void {
    this.shuffle.update((shuffle) => !shuffle)
  }

  ended(): void {
    const currentRemix = this.currentRemix()
    const queue = this.queue()

    switch (this.repeat()) {
      case RepeatOption.Single:
        this.audioState.play()
        break
      case RepeatOption.All:
        this.next()
        break
      case RepeatOption.None:
      default:
        if (
          currentRemix &&
          queue.remixes.findIndex((remix) => remix.id === currentRemix.id) < queue.remixes.length - 1
        ) {
          this.next()
        } else {
          this.audioState.pause()
        }
        break
    }
  }
}
