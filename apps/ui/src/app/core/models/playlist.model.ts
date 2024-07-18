import { Remix } from './remix.model'

export interface Playlist {
  id: string
  name: string
  remixes: Remix[]
}
