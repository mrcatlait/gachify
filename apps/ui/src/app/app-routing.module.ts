import { NgModule } from '@angular/core'
import { PreloadAllModules, Route, RouterModule, TitleStrategy } from '@angular/router'

import { canActivateAuthorized, canActivateUnauthorized } from '@core/guards'
import { Layout } from '@core/models'
import { PageTitleStrategy } from '@core/strategies'

interface RouteWithLayout extends Route {
  data?: {
    layout: Layout
  }
}

const routes: RouteWithLayout[] = [
  {
    path: '',
    canActivate: [canActivateAuthorized],
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home').then((c) => c.HomePage),
        pathMatch: 'full',
      },
      {
        path: 'artists/:id',
        loadComponent: () => import('./pages/artist-details').then((c) => c.ArtistDetailsPage),
      },
      {
        path: 'remixes',
        pathMatch: 'full',
        loadComponent: () => import('./pages/remixes').then((c) => c.RemixesPage),
      },
      {
        path: 'playlists',
        pathMatch: 'full',
        loadComponent: () => import('./pages/playlists').then((c) => c.PlaylistsPage),
      },
      {
        path: 'playlists/:id',
        loadComponent: () => import('./pages/playlist-details').then((c) => c.PlaylistsDetailsPage),
      },
      {
        path: 'library',
        loadComponent: () => import('./pages/playlist-details').then((c) => c.PlaylistsDetailsPage),
      },
    ],
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () => import('./pages/login').then((c) => c.LoginPage),
    canActivate: [canActivateUnauthorized],
    data: {
      layout: Layout.Blank,
    },
  },
  {
    path: 'registration',
    pathMatch: 'full',
    loadComponent: () => import('./pages/registration').then((c) => c.RegistrationPage),
    canActivate: [canActivateUnauthorized],
    data: {
      layout: Layout.Blank,
    },
  },
  {
    path: 'sso',
    pathMatch: 'full',
    loadComponent: () => import('./pages/sso').then((c) => c.SsoPage),
    canActivate: [canActivateUnauthorized],
    data: {
      layout: Layout.Blank,
    },
  },
  {
    path: '404',
    pathMatch: 'full',
    loadComponent: () => import('./pages/not-found').then((c) => c.NotFoundPage),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '404',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true, preloadingStrategy: PreloadAllModules })],
  providers: [
    {
      provide: TitleStrategy,
      useClass: PageTitleStrategy,
    },
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
