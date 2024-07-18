import { Directive, effect, inject } from '@angular/core'
import { NgIf } from '@angular/common'

import { AuthState } from '@core/state'

@Directive({
  selector: '[isUnauthenticated]',
  hostDirectives: [NgIf],
})
export class IsUnauthenticatedDirective {
  private readonly authState = inject(AuthState)
  private readonly ngIfDirective = inject(NgIf, { host: true })

  constructor() {
    effect(() => {
      this.ngIfDirective.ngIf = !this.authState.isAuthenticated()
    })
  }
}
