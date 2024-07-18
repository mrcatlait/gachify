import { Injectable, inject } from '@angular/core'

import { ArtistRepository } from '@core/repositories'
import { Artist } from '@core/models'
import { EntityState } from '@core/state'

@Injectable()
export class ArtistPopularState extends EntityState<Artist[], void> {
  private readonly repository = inject(ArtistRepository)

  protected fetchFn = () => this.repository.getPopular()
}
