import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { SsoState } from '../../state'

import { REDIRECT_URL_PARAM } from '@core/constants'

@Component({
  selector: 'gachi-sso',
  templateUrl: 'sso.component.html',
  styleUrls: ['sso.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SsoComponent implements OnInit {
  private readonly ssoState = inject(SsoState)
  private readonly route = inject(ActivatedRoute)

  ngOnInit() {
    const redirectUrl = this.route.snapshot.queryParams[REDIRECT_URL_PARAM]
    this.ssoState.whoami(redirectUrl)
  }
}
