import { NgModule } from '@angular/core'
import { RouterLink } from '@angular/router'

import { SsoState } from './state'
import { SsoComponent } from './components'

import { SharedModule } from '@shared/shared.module'

@NgModule({
  declarations: [SsoComponent],
  imports: [RouterLink, SharedModule],
  providers: [SsoState],
  exports: [SsoComponent],
})
export class SsoModule {}
