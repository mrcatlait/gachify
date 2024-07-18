import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'gachi-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistDetailsComponent {}
