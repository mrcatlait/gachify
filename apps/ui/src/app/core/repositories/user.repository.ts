import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'

import { User } from '@core/models'
import { environment } from '@environment'

@Injectable({ providedIn: 'root' })
export class UserRepository {
  private readonly httpClient = inject(HttpClient)

  whoAmI() {
    return this.httpClient.get<User>(`${environment.apiUrl}/auth/whoami`)
  }
}
