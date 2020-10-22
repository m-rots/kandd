export type Film = {
  poster: string
  imdb: string
  title: string
}

export type Person = {
  imdb: string
  name: string
}

export type Filter = {
  label: string
  values: string[]
}

export enum Modal {
  None,
  ReleaseYear,
  MinRating,
  MaxRating,
}