import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { DialogComponent } from '@shared/components'
import { SharedModule } from '@shared/shared.module'

@Component({
  selector: 'gachi-invite',
  standalone: true,
  templateUrl: 'invite.component.html',
  styleUrls: ['invite.component.scss'],
  imports: [SharedModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InviteDialogComponent {
  @ViewChild(DialogComponent, { static: true }) dialog: DialogComponent

  readonly form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  handleOpen(): void {
    this.form.reset()
    this.form.markAsPristine()
    this.dialog.open()
  }
}
