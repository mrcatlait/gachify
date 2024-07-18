import { NgModule } from '@angular/core'

import { PlaylistDetailsComponent, PlaylistDetailsHeaderComponent } from './components'

import { SharedModule } from '@shared/shared.module'

@NgModule({
  imports: [SharedModule],
  declarations: [PlaylistDetailsComponent, PlaylistDetailsHeaderComponent],
  exports: [PlaylistDetailsComponent],
})
export class PlaylistDetailsModule {}
