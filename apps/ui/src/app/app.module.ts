import { NgModule, provideExperimentalZonelessChangeDetection } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { asciiArt } from './app-intro-console'

import { BlankLayoutComponent, DefaultLayoutComponent } from '@core/layout'
import { PlayerModule } from '@features/player'
import { CoreModule } from '@core/core.module'
import { SharedModule } from '@shared/shared.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BlankLayoutComponent,
    CoreModule,
    DefaultLayoutComponent,
    PlayerModule,
    RouterOutlet,
    SharedModule,
  ],
  providers: [provideExperimentalZonelessChangeDetection()],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    console.info(asciiArt)
  }
}
