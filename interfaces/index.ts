export type Film = {
  poster: string
  imdb: string
  title: string
}

export enum Modal {
  None,
  Actor,
  Director,
  Rating,
  ReleaseYear,
  Runtime,
}