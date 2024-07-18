import { Remix } from './remix.model'

interface QueueSource {
  entityId?: string
  name: string
}

export interface Queue {
  source: QueueSource
  remixes: Remix[]
}
