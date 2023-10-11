export type Image = {
  '#text': string
  size: string
}

export type FirestoreItem = {
  artist?: string
  id: string
  image: Image
  listeners?: string
  name: string
  play: string
}

export type Music = {
  albums: FirestoreItem[]
  artists: FirestoreItem[]
  tracks: FirestoreItem[]
}
