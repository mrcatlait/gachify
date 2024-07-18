import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'

import { REDIRECT_URL_PARAM } from '@core/constants'
import { emailValidator } from '@core/validators'
import { LoginState } from '@features/login/state'
import { loginSelectors } from '@selectors'

@Component({
  selector: 'gachi-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly route = inject(ActivatedRoute)
  private readonly loginState = inject(LoginState)

  readonly invalidCredentials = this.loginState.invalidCredentials
  readonly loading = this.loginState.loading

  readonly selectors = loginSelectors

  private readonly redirectUrl = this.route.snapshot.queryParams[REDIRECT_URL_PARAM]

  form = new FormGroup({
    email: new FormControl('', [Validators.required, emailValidator]),
    password: new FormControl('', [Validators.required]),
  })

  handleSubmit(): void {
    if (this.form.valid) {
      const email = this.form.controls.email.value ?? ''
      const password = this.form.controls.password.value ?? ''

      this.loginState.login({ email, password, redirectUrl: this.redirectUrl })
    } else {
      this.form.markAllAsTouched()
    }
  }
}
