import { NgModule } from '@angular/core'

import { ArtistPopularCardComponent, ArtistPopularCardSkeletonComponent, ArtistPopularComponent } from './components'
import { ArtistPopularState } from './state'

import { SharedModule } from '@shared/shared.module'

@NgModule({
  imports: [SharedModule],
  providers: [ArtistPopularState],
  declarations: [ArtistPopularCardComponent, ArtistPopularCardSkeletonComponent, ArtistPopularComponent],
  exports: [ArtistPopularComponent],
})
export class ArtistPopularModule {}
