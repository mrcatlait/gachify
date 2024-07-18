import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { map } from 'rxjs'

import { PageOptions, PageResponse, Remix } from '@core/models'
import { environment } from '@environment'

@Injectable({
  providedIn: 'root',
})
export class RemixRepository {
  private readonly httpClient = inject(HttpClient)

  getPopular() {
    return this.httpClient
      .get<PageResponse<Remix>>(`${environment.apiUrl}/remixes/popular`, {
        params: { take: String(12), page: String(1) },
      })
      .pipe(map((response) => response.data))
  }

  get({ limit, offset }: PageOptions) {
    return this.httpClient.get<PageResponse<Remix>>(`${environment.apiUrl}/remixes`, {
      params: { limit: String(limit), offset: String(offset + 1) },
    })
  }
}
