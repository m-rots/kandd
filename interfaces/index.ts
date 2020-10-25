export type Film = {
  poster: string
  imdb: string
  title: string
}

export enum Modal {
  None,
  Actor,
  Director,
  Genre,
  Rating,
  ReleaseYear,
  Runtime,
}

export const Genres = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "FilmNoir",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "Romance",
  "ScienceFiction",
  "Sport",
  "Thriller",
  "War",
  "Western",
]