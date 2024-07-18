import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  ElementRef,
  EnvironmentInjector,
  inject,
  Injectable,
  Injector,
  TemplateRef,
  Type,
  ViewContainerRef,
  ɵViewRef,
} from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'

import { DialogRef, InternalDialogRef } from './dialog-ref'
import { DialogComponent } from './components'
import { GLOBAL_DIALOG_CONFIG, NODES_TO_INSERT } from './providers'
import { AttachOptions, DialogConfig, ExtractData, ExtractResult, GlobalDialogConfig } from './types'

@Injectable({ providedIn: 'root' })
export class DialogService {
  private readonly appRef = inject(ApplicationRef)
  private readonly injector = inject(EnvironmentInjector)
  private readonly globalConfig = inject(GLOBAL_DIALOG_CONFIG)

  dialogs: Map<string, DialogRef> = new Map()

  private readonly hasOpenDialogSub = new BehaviorSubject<boolean>(false)
  hasOpenDialogs$ = this.hasOpenDialogSub.asObservable()

  hasOpenDialogs() {
    return this.dialogs.size > 0
  }

  isOpen(id: string) {
    return this.dialogs.has(id)
  }

  isLastOpened(idOrRef: string | DialogRef): boolean {
    const id = idOrRef instanceof DialogRef ? idOrRef.id : idOrRef

    return this.dialogs.has(id) && this.dialogs.size === 1
  }

  closeAll() {
    this.dialogs.forEach((dialog) => dialog.close())
  }

  open(template: TemplateRef<unknown>, config?: Partial<DialogConfig>): DialogRef
  open<C extends Type<unknown>>(
    component: C,
    config?: Partial<DialogConfig<ExtractData<InstanceType<C>>>>,
  ): DialogRef<ExtractData<InstanceType<C>>, ExtractResult<InstanceType<C>>>
  open(componentOrTemplate: unknown, config: Partial<DialogConfig> = {}): DialogRef | void {
    const mergedConfig = this.mergeConfig(config)

    if (isComponent(componentOrTemplate)) {
      mergedConfig.id = componentOrTemplate.name
    }

    if (this.isOpen(mergedConfig.id)) {
      return
    }

    const dialogRef = new InternalDialogRef({
      config: mergedConfig,
      backdropClick$: new Subject<MouseEvent>(),
    })

    const attachOptions = isTemplate(componentOrTemplate)
      ? this.openTemplate(componentOrTemplate, dialogRef)
      : isComponent(componentOrTemplate)
        ? this.openComponent(componentOrTemplate, dialogRef)
        : throwMustBeAComponentOrATemplateRef(componentOrTemplate)

    if (this.isOpen(dialogRef.id)) {
      attachOptions.view.destroy()
      return
    }

    if (mergedConfig.onOpen) {
      mergedConfig.onOpen()
    }

    this.dialogs.set(dialogRef.id, dialogRef)
    this.hasOpenDialogSub.next(true)

    return this.attach(dialogRef, attachOptions)
  }

  private openTemplate(template: TemplateRef<unknown>, dialogRef: InternalDialogRef) {
    const config = dialogRef.config
    const context = {
      $implicit: dialogRef,
      config,
    }

    const view = config.vcr.createEmbeddedView(template, context) || template.createEmbeddedView(context)

    return {
      ref: template,
      view,
      attachToApp: !config.vcr,
    }
  }

  private openComponent(Component: Type<unknown>, dialogRef: InternalDialogRef) {
    const componentRef = createComponent(Component, {
      elementInjector: Injector.create({
        providers: [
          {
            provide: DialogRef,
            useValue: dialogRef,
          },
        ],
        parent: (dialogRef.config.vcr as ViewContainerRef | undefined)?.injector || this.injector,
      }),
      environmentInjector: this.injector,
    })

    return {
      ref: componentRef,
      view: componentRef.hostView,
      attachToApp: true,
    }
  }

  private attach(
    dialogRef: InternalDialogRef,
    { ref, view, attachToApp }: AttachOptions,
  ): DialogRef<unknown, unknown, ComponentRef<unknown> | TemplateRef<unknown>> {
    const dialog = this.createDialog(dialogRef, view)

    const container = getNativeElement(dialogRef.config.container)

    const hooks = {
      after: new Subject<unknown>(),
    }

    const onClose = (result: unknown) => {
      this.globalConfig.onClose?.()

      this.dialogs.delete(dialogRef.id)

      this.hasOpenDialogSub.next(this.hasOpenDialogs())

      container.removeChild(dialog.location.nativeElement)
      this.appRef.detachView(dialog.hostView)
      this.appRef.detachView(view)

      dialog.destroy()
      view.destroy()

      dialogRef.backdropClick$.complete()

      dialogRef.mutate({
        ref: undefined,
        onClose: undefined,
        afterClosed$: undefined,
        backdropClick$: undefined,
        beforeCloseGuards: undefined,
      })

      hooks.after.next(result)
      hooks.after.complete()
    }

    dialogRef.mutate({
      ref,
      onClose,
      afterClosed$: hooks.after.asObservable(),
    })

    container.appendChild(dialog.location.nativeElement)
    this.appRef.attachView(dialog.hostView)

    if (attachToApp) {
      this.appRef.attachView(view)
    }

    return dialogRef.asDialogRef()
  }

  private createDialog(dialogRef: InternalDialogRef, view: ɵViewRef<unknown>) {
    return createComponent(DialogComponent, {
      elementInjector: Injector.create({
        providers: [
          {
            provide: InternalDialogRef,
            useValue: dialogRef,
          },
          {
            provide: NODES_TO_INSERT,
            useValue: view.rootNodes,
          },
        ],
        parent: this.injector,
      }),
      environmentInjector: this.injector,
    })
  }

  private mergeConfig(inlineConfig: Partial<DialogConfig>): DialogConfig & GlobalDialogConfig {
    return {
      ...this.globalConfig,
      ...inlineConfig,
    } as DialogConfig & GlobalDialogConfig
  }
}

function throwMustBeAComponentOrATemplateRef(value: unknown): never {
  throw new TypeError(`Dialog must receive a Component or a TemplateRef, but this has been passed instead: ${value}`)
}

function getNativeElement(element: Element | ElementRef): Element {
  return element instanceof ElementRef ? element.nativeElement : element
}

function isTemplate(tplOrComp: unknown): tplOrComp is TemplateRef<unknown> {
  return tplOrComp instanceof TemplateRef
}

function isComponent(tplOrComp: unknown): tplOrComp is Type<unknown> {
  return !isTemplate(tplOrComp) && typeof tplOrComp === 'function'
}
