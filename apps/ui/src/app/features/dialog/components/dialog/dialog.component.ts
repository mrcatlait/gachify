import { CommonModule, DOCUMENT } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  isDevMode,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { fromEvent, merge, Subject } from 'rxjs'
import { filter, takeUntil } from 'rxjs/operators'

import { InternalDialogRef } from '../../dialog-ref'
import { NODES_TO_INSERT } from '../../providers'

@Component({
  selector: 'gachi-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements OnInit, OnDestroy {
  dialogRef = inject(InternalDialogRef)
  config = this.dialogRef.config

  @ViewChild('backdrop', { static: true })
  private readonly backdrop: ElementRef<HTMLDivElement>

  @ViewChild('dialog', { static: true })
  private readonly dialogElement: ElementRef<HTMLElement>

  private readonly destroy$ = new Subject<void>()

  private nodes = inject(NODES_TO_INSERT)

  private readonly document = inject(DOCUMENT)
  private readonly host: HTMLElement = inject(ElementRef).nativeElement

  constructor() {
    // Append nodes to dialog component, template or component could need
    // something from the dialog component
    // for example, if `[dialogClose]` is used into a directive,
    // DialogRef will be getted from DialogService instead of DI
    this.nodes.forEach((node) => this.host.appendChild(node))

    if (!this.config.id) {
      const id = `dialog-${crypto.randomUUID()}`
      this.config.id = id
      this.dialogRef.updateConfig({ id })
      if (isDevMode()) {
        console.warn(
          `[@ngneat/dialog]: Dialog id is not provided, generated id is ${id}, providing an id is recommended to prevent unexpected multiple behavior`,
        )
      }
    }

    this.host.id = this.config.id
  }

  ngOnInit() {
    const backdrop = this.backdrop.nativeElement
    const dialogElement = this.dialogElement.nativeElement

    const backdropClick$ = fromEvent<MouseEvent>(backdrop, 'click', { capture: true }).pipe(
      filter(({ target }) => !dialogElement.contains(target as Element)),
    )

    backdropClick$.pipe(takeUntil(this.destroy$)).subscribe(this.dialogRef.backdropClick$)

    merge(
      fromEvent<KeyboardEvent>(this.document.body, 'keyup').pipe(filter(({ key }) => key === 'Escape')),
      backdropClick$,
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.closeDialog())

    // `dialogElement` is resolved at this point
    // And here is where dialog finally will be placed
    this.nodes.forEach((node) => dialogElement.appendChild(node))
  }

  closeDialog() {
    this.dialogRef.close()
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()

    this.dialogRef = null as unknown as InternalDialogRef
    this.nodes = null as unknown as Element[]
  }
}
