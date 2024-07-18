import { NgModule } from '@angular/core'

import { PlaylistListComponent, PlaylistListItemComponent } from './components'
import { PlaylistListState } from './state'

import { SharedModule } from '@shared/shared.module'

@NgModule({
  imports: [SharedModule],
  providers: [PlaylistListState],
  declarations: [PlaylistListComponent, PlaylistListItemComponent],
  exports: [PlaylistListComponent],
})
export class PlaylistListModule {}
