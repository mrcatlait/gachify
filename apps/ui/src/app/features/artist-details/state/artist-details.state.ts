import { Injectable, computed, inject } from '@angular/core'
import { combineLatest, map } from 'rxjs'

import { ArtistRepository } from '@core/repositories'
import { Artist, Queue, Remix } from '@core/models'
import { EntityState } from '@core/state'

type FetchPayload = { artistId: string }

interface ArtistDetails {
  artist: Artist
  remixes: Remix[]
  total: number
}

@Injectable()
export class ArtistDetailsState extends EntityState<ArtistDetails, FetchPayload> {
  private readonly repository = inject(ArtistRepository)

  readonly artist = computed(() => this.data()?.artist)
  readonly total = computed(() => this.data()?.total)
  readonly remixes = computed(() => this.data()?.remixes || [])
  readonly queue = computed<Queue>(() => {
    const artist = this.artist()
    const remixes = this.remixes()

    return {
      remixes,
      source: { entityId: artist?.id, name: artist?.name ?? '' },
    }
  })

  protected fetchFn = (payload: FetchPayload) =>
    combineLatest([this.repository.getDetails(payload.artistId), this.repository.getRemixes(payload.artistId)]).pipe(
      map(([artist, remixesResponse]) => ({
        artist,
        remixes: remixesResponse.data,
        total: remixesResponse.meta.total,
      })),
    )
}
