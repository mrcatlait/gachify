import { ChangeDetectionStrategy, Component } from '@angular/core'

import { PlaylistListModule } from '@features/playlist-list'

@Component({
  standalone: true,
  selector: 'gachi-playlists-page',
  template: '<gachi-playlist-list>',
  imports: [PlaylistListModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistsPage {}
