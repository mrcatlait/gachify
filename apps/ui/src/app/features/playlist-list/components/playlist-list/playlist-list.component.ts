import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core'

import { PlaylistListState } from '@features/playlist-list/state'

@Component({
  selector: 'gachi-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistListComponent implements OnInit {
  private readonly playlistListState = inject(PlaylistListState)

  playlists = this.playlistListState.data

  ngOnInit(): void {
    this.playlistListState.fetch()
  }
}
