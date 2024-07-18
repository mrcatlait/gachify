import { ComponentRef, ElementRef, TemplateRef, ViewContainerRef, ViewRef } from '@angular/core'

import { DialogRef } from './dialog-ref'

export interface GlobalDialogConfig {
  container: ElementRef<Element> | Element
  onOpen: () => void | undefined
  onClose: () => void | undefined
}

export interface DialogConfig<Data = unknown> extends Omit<GlobalDialogConfig, 'sizes'> {
  id: string
  data: Data
  vcr: ViewContainerRef
}

export type JustProps<T extends object> = Pick<
  T,
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [K in keyof T]: T[K] extends (...args: any[]) => unknown ? never : K
  }[keyof T]
>

export type ExtractRefProp<T> = NonNullable<
  {
    [P in keyof T]: T[P] extends DialogRef ? P : never
  }[keyof T]
>

export type ExtractData<T> =
  ExtractRefProp<T> extends never ? unknown : T[ExtractRefProp<T>] extends DialogRef<infer Data> ? Data : never
export type ExtractResult<T> =
  ExtractRefProp<T> extends never
    ? unknown
    : T[ExtractRefProp<T>] extends DialogRef<unknown, infer Result>
      ? Result
      : never

export interface AttachOptions {
  ref: ComponentRef<unknown> | TemplateRef<unknown>
  view: ViewRef
  attachToApp: boolean
}
