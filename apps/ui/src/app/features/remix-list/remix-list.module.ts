import { NgModule } from '@angular/core'

import { RemixListComponent } from './components'
import { RemixListState } from './state'

import { SharedModule } from '@shared/shared.module'

@NgModule({
  imports: [SharedModule],
  providers: [RemixListState],
  declarations: [RemixListComponent],
  exports: [RemixListComponent],
})
export class RemixListModule {}
