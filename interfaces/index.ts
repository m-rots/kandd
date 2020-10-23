export type Film = {
  poster: string
  imdb: string
  title: string
}

export type Person = {
  imdb: string
  name: string
}

export enum Modal {
  None,
  ReleaseYear,
  Rating,
}