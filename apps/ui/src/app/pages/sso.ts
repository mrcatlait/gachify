import { ChangeDetectionStrategy, Component } from '@angular/core'

import { SsoModule } from '@features/sso'

@Component({
  standalone: true,
  selector: 'gachi-sso-page',
  template: `<gachi-sso />`,
  imports: [SsoModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SsoPage {}
