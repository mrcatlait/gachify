import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'gachi-playlist-details-header',
  templateUrl: './playlist-details-header.component.html',
  styleUrls: ['./playlist-details-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistDetailsHeaderComponent {}
