import { ChangeDetectionStrategy, Component, HostListener, OnInit, computed, inject } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { DOCUMENT } from '@angular/common'

import { AudioState, PlaybackState } from '@core/state'
import { PlayerStatus } from '@core/models'
import { visualizerSelectors } from '@selectors'

@Component({
  selector: 'gachi-visualizer-media',
  templateUrl: 'visualizer-media.component.html',
  styleUrl: 'visualizer-media.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualizerMediaComponent implements OnInit {
  private readonly playbackState = inject(PlaybackState)
  private readonly audioState = inject(AudioState)
  private readonly document = inject(DOCUMENT)

  readonly currentRemix = this.playbackState.currentRemix
  readonly playing = this.audioState.playing

  private readonly sizeSubject = new BehaviorSubject<number>(0)
  readonly size$ = this.sizeSubject.asObservable()

  readonly selectors = visualizerSelectors

  readonly icon = computed(() => {
    switch (this.audioState.status()) {
      case PlayerStatus.Playing:
        return 'pause'
      case PlayerStatus.Paused:
      default:
        return 'play_arrow'
    }
  })

  ngOnInit(): void {
    this.calculateContainerSize()
  }

  @HostListener('window:resize')
  onResize(): void {
    this.calculateContainerSize()
  }

  handleClick(): void {
    this.audioState.togglePlay()
  }

  private calculateContainerSize(): void {
    const MAX_SIZE = 720

    const PADDING = 96

    const OFFSET_HEIGHT = PADDING * 2 + 96 + 80
    const OFFSET_WIDTH = PADDING * 2

    const body = this.document.body

    const height = body.clientHeight - OFFSET_HEIGHT
    const width = body.clientWidth - OFFSET_WIDTH

    const size = Math.min(height, width, MAX_SIZE)

    this.sizeSubject.next(size)
  }
}
