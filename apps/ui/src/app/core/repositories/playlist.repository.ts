import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { map } from 'rxjs'

import { PageResponse, Playlist } from '@core/models'
import { environment } from '@environment'

@Injectable({
  providedIn: 'root',
})
export class PlaylistRepository {
  private readonly httpClient = inject(HttpClient)

  getMy() {
    return this.httpClient
      .get<PageResponse<Playlist>>(`${environment.apiUrl}/playlists/my`)
      .pipe(map((response) => response.data))
  }

  getById(playlistId: string) {
    return this.httpClient
      .get<Playlist>(`${environment.apiUrl}/playlists/${playlistId}`)
      .pipe(map((response) => response))
  }

  addSong(playlistId: string, songId: string) {
    return this.httpClient
      .put<Playlist>(`${environment.apiUrl}/playlists/${playlistId}`, { addSong: songId })
      .pipe(map((response) => response))
  }
}
