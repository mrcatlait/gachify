import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable, map } from 'rxjs'

import { Artist, PageResponse, Remix } from '@core/models'
import { environment } from '@environment'

@Injectable({
  providedIn: 'root',
})
export class ArtistRepository {
  private readonly httpClient = inject(HttpClient)

  getPopular() {
    return this.httpClient
      .get<PageResponse<Artist>>(`${environment.apiUrl}/artists/popular`)
      .pipe(map((response) => response.data))
  }

  getDetails(artistId: string) {
    return this.httpClient.get<Artist>(`${environment.apiUrl}/artists/${artistId}`, {
      headers: { accept: 'application/json' },
    })
  }

  getRemixes(artistId: string): Observable<PageResponse<Remix>> {
    return this.httpClient.get<PageResponse<Remix>>(`${environment.apiUrl}/artists/${artistId}/remixes`)
  }

  getSimilarArtists() {
    // /artists/:id/similar-artists
    return this.httpClient.get<PageResponse<Artist>>(`assets/mocks/artists.json`).pipe(map((response) => response.data))
  }
}
