import { NgModule } from '@angular/core'

import { RemixPopularComponent } from './components'
import { RemixPopularState } from './state'

import { SharedModule } from '@shared/shared.module'

@NgModule({
  imports: [SharedModule],
  providers: [RemixPopularState],
  declarations: [RemixPopularComponent],
  exports: [RemixPopularComponent],
})
export class RemixPopularModule {}
