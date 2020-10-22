import { atom } from 'recoil';
import { Film, Person, Modal } from 'interfaces';

export const modalState = atom<Modal>({
  key: "modal",
  default: Modal.None,
});

export const releaseYearState = atom({
  key: "releaseYear",
  default: 2020,
});

export const minRatingState = atom({
  key: "minRating",
  default: 5.0,
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
  default: [],
  // default: [
  //   {
  //     imdb: "nm0634240",
  //     name: "Christopher Nolan",
  //   },
  // ],
});
