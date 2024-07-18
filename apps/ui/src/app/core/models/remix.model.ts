import { Artist } from './artist.model'
import { Image } from './image.model'

export interface Remix {
  id: string
  title: string
  images: Image[]
  artist: Artist
  duration: number
  // color: string
  // tags
  // original song
  // original artist
}
