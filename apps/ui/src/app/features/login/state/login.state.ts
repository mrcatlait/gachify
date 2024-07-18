import { Injectable, inject, signal } from '@angular/core'
import { take } from 'rxjs'
import { HttpErrorResponse } from '@angular/common/http'

import { LoginService } from '../services'

import { StateModel } from '@core/models'
import { AuthState } from '@core/state'

export interface LoginStateModel {
  loading: boolean
  invalidCredentials: boolean
}

@Injectable()
export class LoginState implements StateModel<LoginStateModel> {
  private readonly loginService = inject(LoginService)
  private readonly authState = inject(AuthState)

  readonly loading = signal(false)
  readonly invalidCredentials = signal(false)

  login(payload: { email: string; password: string; redirectUrl: string }): void {
    this.loading.set(true)
    this.invalidCredentials.set(false)

    this.loginService
      .login(payload)
      .pipe(take(1))
      .subscribe({
        next: (user) => {
          this.loading.set(false)
          this.authState.login({ user, redirectUrl: payload.redirectUrl })
        },
        error: (error) => this.handleError({ error }),
      })
  }

  private handleError(payload: { error: Error }): void {
    if (payload.error.name === 'HttpErrorResponse' && (payload.error as HttpErrorResponse).status === 401) {
      this.invalidCredentials.set(true)
    }

    this.loading.set(false)
  }
}
