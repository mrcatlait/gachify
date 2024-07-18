import { Injectable, computed, inject, signal } from '@angular/core'
import { Router } from '@angular/router'

import { User } from '@core/models'

@Injectable({
  providedIn: 'root',
})
export class AuthState {
  private readonly router = inject(Router)

  readonly user = signal<User | null>(null)
  readonly initialCheck = signal<boolean>(true)

  readonly isAuthenticated = computed(() => Boolean(this.user()))

  login(payload: { user: User; redirectUrl?: string }): void {
    this.user.set(payload.user)
    this.router.navigate([payload.redirectUrl ?? '/'])
  }

  logout(): void {
    this.user.set(null)

    this.router.navigate(['/login'])
  }
}
