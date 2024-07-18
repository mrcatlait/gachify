import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core'

import { PlaylistRecommendedState } from '@features/playlist-recommended/state'

@Component({
  selector: 'gachi-playlist-recommended',
  templateUrl: './playlist-recommended.component.html',
  styleUrls: ['./playlist-recommended.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistRecommendedComponent implements OnInit {
  private readonly playlistRecommendedState = inject(PlaylistRecommendedState)

  readonly playlists = this.playlistRecommendedState.data

  ngOnInit(): void {
    this.playlistRecommendedState.fetch()
  }
}
