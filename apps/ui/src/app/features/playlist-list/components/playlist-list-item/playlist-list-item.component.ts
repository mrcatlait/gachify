import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { Playlist } from '@core/models'

@Component({
  selector: 'gachi-playlist-list-item',
  templateUrl: './playlist-list-item.component.html',
  styleUrls: ['./playlist-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistListItemComponent {
  @Input({ required: true }) playlist: Playlist
}
