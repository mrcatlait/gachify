import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'

// import { AuthResponse } from '@core/models'
import { environment } from '@environment'

@Injectable()
export class RegistrationService {
  private readonly httpClient = inject(HttpClient)

  register(payload: { username: string; password: string }) {
    return this.httpClient.post<unknown>(`${environment.apiUrl}/auth/register`, payload)
  }
}
