import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, ViewChild, inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'

import { PlaybackState } from '@core/state'
import { popularRemixesSelectors } from '@selectors'
import { RemixListState } from '@features/remix-list/state'

@Component({
  selector: 'gachi-remix-list',
  templateUrl: './remix-list.component.html',
  styleUrl: './remix-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemixListComponent implements OnInit {
  private readonly remixListState = inject(RemixListState)
  private readonly playbackState = inject(PlaybackState)
  private readonly document = inject(DOCUMENT)

  @ViewChild('container') containerRef: ElementRef<HTMLElement>

  readonly currentRemixId = this.playbackState.currentRemixId

  readonly remixes = this.remixListState.remixes
  readonly loading = this.remixListState.loading
  readonly hasNextPage = this.remixListState.hasNextPage

  readonly selectors = popularRemixesSelectors

  ngOnInit(): void {
    this.remixListState.fetch()
  }

  numSequence(n: number): Array<number> {
    return Array(n)
  }

  @HostListener('window:scroll')
  handleScroll(): void {
    if (this.loading() || !this.hasNextPage()) {
      return
    }

    const ITEM_HEIGHT = 72

    const scrollPos = this.document.documentElement.scrollTop + this.document.documentElement.clientHeight
    const containerBottom = this.containerRef.nativeElement.clientHeight + this.containerRef.nativeElement.offsetTop

    if (scrollPos >= containerBottom - ITEM_HEIGHT * 5) {
      this.remixListState.fetch()
    }
  }
}
