import { NgModule } from '@angular/core'

import {
  ArtistDetailsComponent,
  ArtistDetailsHeaderComponent,
  ArtistDetailsHeaderSkeletonComponent,
  ArtistDetailsRemixesComponent,
} from './components'
import { ArtistDetailsState } from './state'

import { SharedModule } from '@shared/shared.module'

@NgModule({
  imports: [SharedModule],
  providers: [ArtistDetailsState],
  declarations: [
    ArtistDetailsComponent,
    ArtistDetailsHeaderComponent,
    ArtistDetailsHeaderSkeletonComponent,
    ArtistDetailsRemixesComponent,
  ],
  exports: [ArtistDetailsComponent],
})
export class ArtistDetailsModule {}
