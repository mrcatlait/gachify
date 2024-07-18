import { ChangeDetectionStrategy, Component } from '@angular/core'

import { LoginModule } from '@features/login'

@Component({
  standalone: true,
  selector: 'gachi-login-page',
  template: '<gachi-login/>',
  imports: [LoginModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {}
