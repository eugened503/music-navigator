export type Image = {
  '#text': string
  size: string
}

type Item = {
  artist?: string
  id: string
  image: Image
  listeners?: string
  name: string
  play: string
}

export type Album = Item

export type Artist = Item

export type Track = Item

export type Music = {
  albums: Album[]
  artists: Artist[]
  tracks: Track[]
}
