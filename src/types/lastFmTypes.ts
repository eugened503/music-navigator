import { Image } from './firestoreTypes'

export type LastFmItem = {
  artist: string
  image: Image[]
  listeners: string
  mbid: string
  name: string
  streamable: string
  url: string
}
