import { Directive, ElementRef, HostListener, inject, Input, OnInit } from '@angular/core'

import { DialogRef } from '../dialog-ref'
import { DialogService } from '../dialog.service'

@Directive({
  selector: '[dialogClose]',
  standalone: true,
})
export class DialogCloseDirective implements OnInit {
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef)
  private readonly dialogService = inject(DialogService)
  ref = inject(DialogRef, { optional: true })

  @Input()
  dialogClose: unknown

  ngOnInit() {
    this.ref = this.ref || this.getRefFromParent()
  }

  @HostListener('click')
  onClose() {
    this.ref?.close(this.dialogClose)
  }

  private getRefFromParent(): DialogRef | null {
    let parent = this.host.nativeElement.parentElement

    while (parent && parent.localName !== 'gachi-dialog') {
      parent = parent.parentElement
    }

    return parent ? (this.dialogService.dialogs.get(parent.id) as DialogRef) : null
  }
}
