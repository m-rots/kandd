import { atom, selector } from 'recoil';
import { Film, Person } from 'interfaces';

export const releaseYearState = atom({
  key: "releaseYear",
  default: 0,
});

export const minRatingState = atom({
  key: "minRating",
  default: 7.5,
});

export const maxRatingState = atom({
  key: "maxRating",
  default: 10,
});

export const filmsState = atom<Film[]>({
  key: "films",
  default: [],
});

export const directorsState = atom<Person[]>({
  key: "directors",
  default: [
    {
      imdb: "nm0634240",
      name: "Christopher Nolan",
    },
  ],
});
