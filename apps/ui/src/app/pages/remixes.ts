import { ChangeDetectionStrategy, Component } from '@angular/core'

import { RemixListModule } from '@features/remix-list'

@Component({
  standalone: true,
  selector: 'gachi-remixes-page',
  template: '<gachi-remix-list />',
  imports: [RemixListModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemixesPage {}
