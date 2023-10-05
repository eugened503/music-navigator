export type Image = {
  '#text': string
  size: string
}

export type Album = {
  artist?: string
  id: string
  image: Image
  name: string
  play: string
}

export type Artist = {
  artist?: string
  id: string
  image: Image
  listeners?: Image
  name: string
  play: string
}

export type Track = {
  artist?: string
  id: string
  image: Image
  listeners?: Image
  name: string
  play: string
}

export type Music = {
  albums: Album[]
  artists: Artist[]
  tracks: Track[]
}
