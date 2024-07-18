import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core'

import { popularRemixesSelectors } from '@selectors'
import { RemixPopularState } from '@features/remix-popular/state'
import { PlaybackState } from '@core/state'

@Component({
  selector: 'gachi-remix-popular',
  templateUrl: './remix-popular.component.html',
  styleUrl: './remix-popular.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemixPopularComponent implements OnInit {
  private readonly remixPopularState = inject(RemixPopularState)
  private readonly playbackState = inject(PlaybackState)

  readonly currentRemixId = this.playbackState.currentRemixId

  readonly remixes = this.remixPopularState.remixes
  readonly queue = this.remixPopularState.queue
  readonly loading = this.remixPopularState.loading

  readonly selectors = popularRemixesSelectors

  ngOnInit(): void {
    this.remixPopularState.fetch()
  }

  numSequence(n: number): Array<number> {
    return Array(n)
  }
}
