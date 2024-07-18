import { ChangeDetectionStrategy, Component, inject } from '@angular/core'

import { InviteDialogComponent } from '../test/invite.component'

import { DialogService } from '@features/dialog/dialog.service'

@Component({
  selector: 'gachi-invite',
  templateUrl: 'invite.component.html',
  styleUrls: ['invite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InviteComponent {
  private readonly dialog = inject(DialogService)

  handleOpen(): void {
    const ref = this.dialog.open(InviteDialogComponent, {
      data: { message: 'I am a dynamic component inside of a dialog!' },
    })

    ref.afterClosed$.subscribe((result) => {
      console.log('Dialog closed', result)
    })
  }
}
