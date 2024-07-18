import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'gachi-artist-popular-card-skeleton',
  templateUrl: './artist-popular-card-skeleton.component.html',
  styleUrl: './artist-popular-card-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistPopularCardSkeletonComponent {}
