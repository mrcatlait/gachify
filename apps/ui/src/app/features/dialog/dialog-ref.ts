import { ComponentRef, TemplateRef } from '@angular/core'
import { from, merge, Observable, of, Subject } from 'rxjs'
import { defaultIfEmpty, filter, first } from 'rxjs/operators'

import { DialogConfig, GlobalDialogConfig, JustProps } from './types'

type GuardFN<R> = (result?: R) => Observable<boolean> | Promise<boolean> | boolean

export abstract class DialogRef<
  Data = unknown,
  Result = unknown,
  Ref extends ComponentRef<unknown> | TemplateRef<unknown> = ComponentRef<unknown> | TemplateRef<unknown>,
> {
  ref: Ref
  data: Data
  id: string
  backdropClick$: Observable<MouseEvent>
  afterClosed$: Observable<Result | undefined>

  abstract close(result?: Result): void
  abstract beforeClose(guard: GuardFN<Result>): void
  abstract updateConfig(config: Partial<DialogConfig>): void
}

type InternalDialogRefProps = Partial<
  Omit<JustProps<InternalDialogRef>, 'id' | 'data'> & Pick<InternalDialogRef, 'onClose'>
>

export class InternalDialogRef extends DialogRef {
  config: DialogConfig & GlobalDialogConfig
  override backdropClick$: Subject<MouseEvent>
  beforeCloseGuards: GuardFN<unknown>[] = []
  onClose: (result?: unknown) => void

  constructor(props: InternalDialogRefProps = {}) {
    super()
    this.mutate(props)
  }

  close(result?: unknown): void {
    this.canClose(result)
      .pipe(filter<boolean>(Boolean))
      .subscribe({ next: () => this.onClose(result) })
  }

  beforeClose(guard: GuardFN<unknown>) {
    this.beforeCloseGuards.push(guard)
  }

  canClose(result: unknown): Observable<boolean> {
    const guards$ = this.beforeCloseGuards
      .map((guard) => guard(result))
      .filter((value) => value !== undefined && value !== true)
      .map((value) => {
        return typeof value === 'boolean' ? of(value) : from(value).pipe(filter((canClose) => !canClose))
      })

    return merge(...guards$).pipe(defaultIfEmpty(true), first())
  }

  mutate(props: InternalDialogRefProps) {
    Object.assign(this, props)
    this.data = this.config.data
    this.id = this.config.id
  }

  updateConfig(config: Partial<DialogConfig & GlobalDialogConfig>) {
    this.mutate({
      config: {
        ...this.config,
        ...config,
      },
    })
  }

  asDialogRef(): DialogRef {
    return this
  }
}
