import { DOCUMENT } from '@angular/common'
import { inject, InjectionToken, makeEnvironmentProviders } from '@angular/core'

import { DialogConfig, GlobalDialogConfig } from './types'

export const DIALOG_DOCUMENT_REF = new InjectionToken(
  'A reference to the document. Useful for iframes that want appends to parent window',
  {
    providedIn: 'root',
    factory() {
      return inject(DOCUMENT)
    },
  },
)

export function defaultGlobalConfig(): Partial<GlobalDialogConfig & DialogConfig> {
  return {
    id: undefined,
    container: inject(DIALOG_DOCUMENT_REF).body,
    data: undefined,
    vcr: undefined,
    onClose: undefined,
    onOpen: undefined,
  }
}

export const GLOBAL_DIALOG_CONFIG = new InjectionToken<Partial<GlobalDialogConfig>>('Global dialog config token', {
  providedIn: 'root',
  factory() {
    return defaultGlobalConfig()
  },
})

export const NODES_TO_INSERT = new InjectionToken<Element[]>('Nodes inserted into the dialog')

export function provideDialogConfig(config: Partial<GlobalDialogConfig>) {
  return makeEnvironmentProviders([
    {
      provide: GLOBAL_DIALOG_CONFIG,
      useFactory() {
        const defaultConfig = defaultGlobalConfig()
        return {
          ...defaultConfig,
          ...config,
        }
      },
    },
  ])
}

export function provideDialogDocRef(doc: Document) {
  return makeEnvironmentProviders([
    {
      provide: DIALOG_DOCUMENT_REF,
      useValue: doc,
    },
  ])
}
