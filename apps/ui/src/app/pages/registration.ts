import { ChangeDetectionStrategy, Component } from '@angular/core'

import { RegistrationModule } from '@features/registration'

@Component({
  standalone: true,
  selector: 'gachi-registration-page',
  template: '<gachi-registration/>',
  imports: [RegistrationModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPage {}
