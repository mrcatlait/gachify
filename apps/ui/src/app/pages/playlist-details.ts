import { ChangeDetectionStrategy, Component } from '@angular/core'

import { PlaylistDetailsModule } from '@features/playlist-details'

@Component({
  standalone: true,
  selector: 'gachi-playlists-details-page',
  template: '<gachi-playlist-details>',
  imports: [PlaylistDetailsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistsDetailsPage {}
