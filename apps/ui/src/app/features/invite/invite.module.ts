import { NgModule } from '@angular/core'
import { RouterLink } from '@angular/router'

import { InviteComponent } from './components'

import { SharedModule } from '@shared/shared.module'
import { DialogCloseDirective } from '@features/dialog/directives'

@NgModule({
  declarations: [InviteComponent],
  imports: [DialogCloseDirective, RouterLink, SharedModule],
  providers: [],
  exports: [InviteComponent],
})
export class InviteModule {}
