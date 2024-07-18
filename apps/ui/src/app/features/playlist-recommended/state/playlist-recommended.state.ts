import { Injectable, inject } from '@angular/core'

import { PlaylistRepository } from '@core/repositories'
import { Playlist } from '@core/models'
import { EntityState } from '@core/state'

@Injectable()
export class PlaylistRecommendedState extends EntityState<Playlist[], void> {
  private readonly repository = inject(PlaylistRepository)

  protected fetchFn = () => this.repository.getMy()
}
