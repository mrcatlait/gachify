import { NgModule } from '@angular/core'
import { RouterLink } from '@angular/router'

import { LoginComponent } from './components'
import { LoginService } from './services'
import { LoginState } from './state'

import { SharedModule } from '@shared/shared.module'

@NgModule({
  declarations: [LoginComponent],
  imports: [RouterLink, SharedModule],
  providers: [LoginService, LoginState],
  exports: [LoginComponent],
})
export class LoginModule {}
