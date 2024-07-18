import { DOCUMENT } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EmbeddedViewRef,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  inject,
} from '@angular/core'

import { ScrollService } from '@core/services'

@Component({
  selector: 'gachi-dialog',
  templateUrl: 'dialog.component.html',
  styleUrl: 'dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/use-component-view-encapsulation
  encapsulation: ViewEncapsulation.None,
})
export class DialogComponent implements OnDestroy {
  private readonly document = inject(DOCUMENT)
  private readonly scrollService = inject(ScrollService)

  @ViewChild('container', { static: true, read: ViewContainerRef }) viewContainerRef: ViewContainerRef
  @ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<HTMLElement>

  private embeddedViewRef?: EmbeddedViewRef<HTMLElement>
  private firstClick = true

  ngOnDestroy(): void {
    this.close()
  }

  open(): void {
    this.firstClick = true

    this.scrollService.disable()
    this.embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.templateRef)
    this.addEventListener()
    this.dialog.showModal()
  }

  close(): void {
    this.scrollService.enable()
    this.removeEventListener()
    this.embeddedViewRef?.destroy()
  }

  private addEventListener(): void {
    this.document.addEventListener('keydown', this.escapePressedListener)
    this.document.addEventListener('click', this.clickOutsideListener)
  }

  private removeEventListener(): void {
    this.document.removeEventListener('keydown', this.escapePressedListener)
    this.document.removeEventListener('click', this.clickOutsideListener)
  }

  private readonly escapePressedListener = (event: KeyboardEvent): void => {
    if (event.code === 'Escape') {
      this.close()
    }
  }

  private readonly clickOutsideListener = (event: Event): void => {
    if (this.firstClick) {
      this.firstClick = false
      return
    }

    if (event.target === this.dialog) {
      this.close()
    }
  }

  private get dialog(): HTMLDialogElement {
    return this.embeddedViewRef?.rootNodes[0] as HTMLDialogElement
  }
}
