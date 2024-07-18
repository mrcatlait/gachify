import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core'

import { ArtistDetailsState } from '@features/artist-details/state'

@Component({
  selector: 'gachi-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrl: './artist-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistDetailsComponent implements OnInit {
  private readonly artistDetailsState = inject(ArtistDetailsState)

  @Input({ required: true }) artistId: string

  readonly loading = this.artistDetailsState.loading

  ngOnInit(): void {
    this.artistDetailsState.fetch({ artistId: this.artistId })
  }
}
