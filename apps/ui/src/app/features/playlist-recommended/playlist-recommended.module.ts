import { NgModule } from '@angular/core'

import { PlaylistRecommendedComponent } from './components'
import { PlaylistRecommendedState } from './state'

import { SharedModule } from '@shared/shared.module'

@NgModule({
  imports: [SharedModule],
  providers: [PlaylistRecommendedState],
  declarations: [PlaylistRecommendedComponent],
  exports: [PlaylistRecommendedComponent],
})
export class PlaylistRecommendedModule {}
