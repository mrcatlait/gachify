import { NgModule } from '@angular/core'

import { VisualizerComponent, VisualizerMediaComponent, VisualizerQueueComponent } from './components'

import { SharedModule } from '@shared/shared.module'

@NgModule({
  imports: [SharedModule],
  declarations: [VisualizerComponent, VisualizerMediaComponent, VisualizerQueueComponent],
  providers: [],
  exports: [VisualizerComponent],
})
export class VisualizerModule {}
