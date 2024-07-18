/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component } from '@angular/core'

import { InviteModule } from '@features/invite'
import { navigationSelectors } from '@selectors'
import { SharedModule } from '@shared/shared.module'

@Component({
  standalone: true,
  selector: 'header.gachi-header',
  templateUrl: 'header.component.html',
  styleUrl: 'header.component.scss',
  imports: [SharedModule, InviteModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly selectors = navigationSelectors
}
