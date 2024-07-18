import { NgModule } from '@angular/core'

import { RemixNewReleasesComponent } from './components'

import { SharedModule } from '@shared/shared.module'

@NgModule({
  imports: [SharedModule],
  providers: [],
  declarations: [RemixNewReleasesComponent],
  exports: [RemixNewReleasesComponent],
})
export class RemixNewReleasesModule {}
