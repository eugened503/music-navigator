import { Image } from './music'

type Item = {
  artist: string
  image: Image[]
  listeners: string
  mbid: string
  name: string
  streamable: string
  url: string
}

export type Album = Item

export type Artist = Item

export type Track = Item
