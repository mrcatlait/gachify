import { NgModule } from '@angular/core'

import { NotFoundComponent } from './components'

import { SharedModule } from '@shared/shared.module'

@NgModule({
  declarations: [NotFoundComponent],
  imports: [SharedModule],
  exports: [NotFoundComponent],
})
export class NotFoundModule {}
