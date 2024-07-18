import { NgModule, Optional, SkipSelf } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { provideHttpClient, withInterceptors } from '@angular/common/http'

import { withCredentialsInterceptor } from './interceptors'
import { EnsureModuleLoadedOnceGuard } from './guards'
import { devtoolsImports } from '../../devtools/devtools'

@NgModule({
  imports: [BrowserModule, devtoolsImports],
  providers: [provideHttpClient(withInterceptors([withCredentialsInterceptor]))],
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule)
  }
}
