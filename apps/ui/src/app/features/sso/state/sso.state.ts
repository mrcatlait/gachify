import { Injectable, inject } from '@angular/core'
import { take } from 'rxjs'
import { Router } from '@angular/router'

import { AuthState } from '@core/state'
import { UserRepository } from '@core/repositories'
import { REDIRECT_URL_PARAM } from '@core/constants'

@Injectable()
export class SsoState {
  private readonly repository = inject(UserRepository)
  private readonly authState = inject(AuthState)
  private readonly router = inject(Router)

  whoami(redirectUrl: string): void {
    this.repository
      .whoAmI()
      .pipe(take(1))
      .subscribe({
        next: (user) => {
          this.authState.login({ user, redirectUrl })
        },
        error: () => {
          this.router.navigate(['/login'], { queryParams: { [REDIRECT_URL_PARAM]: redirectUrl } })
        },
      })
  }
}
