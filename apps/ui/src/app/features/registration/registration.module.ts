import { NgModule } from '@angular/core'

import { RegistrationComponent } from './components'
import { RegistrationService } from './services'
import { RegistrationState } from './state'

import { SharedModule } from '@shared/shared.module'

@NgModule({
  declarations: [RegistrationComponent],
  imports: [SharedModule],
  providers: [RegistrationService, RegistrationState],
  exports: [RegistrationComponent],
})
export class RegistrationModule {}
