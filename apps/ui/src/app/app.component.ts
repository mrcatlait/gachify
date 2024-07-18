import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { filter, map, mergeMap } from 'rxjs'

import { Layout } from '@core/models'

@Component({
  selector: 'gachi-root',
  templateUrl: `./app.component.html`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly router = inject(Router)
  private readonly activatedRoute = inject(ActivatedRoute)

  readonly layouts = Layout

  readonly layout$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map(() => this.activatedRoute),
    map((route) => {
      while (route.firstChild) {
        route = route.firstChild
      }
      return route
    }),
    filter((route) => route.outlet === 'primary'),
    mergeMap((route) => route.data),
    map(({ layout }) => layout),
  )
}
