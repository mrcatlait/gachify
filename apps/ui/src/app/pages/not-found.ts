import { ChangeDetectionStrategy, Component } from '@angular/core'

import { NotFoundModule } from '@features/not-found'

@Component({
  standalone: true,
  selector: 'gachi-not-found-page',
  template: '<gachi-not-found/>',
  imports: [NotFoundModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {}
