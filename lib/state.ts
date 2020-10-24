import { atom } from 'recoil';
import { Film, Person, Modal } from 'interfaces';
import { StdRangeFilter } from 'interfaces/range';

export const modalState = atom<Modal>({
  key: "modal",
  default: Modal.None,
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

export const releaseYearState = atom<StdRangeFilter>({
  key: "releaseYear",
  default: {
    enabled: false,
    value: 2020,
  },
});

export const ratingState = atom<StdRangeFilter>({
  key: "rating",
  default: {
    enabled: false,
    value: {
      min: 1,
      max: 10,
    },
  },
});

export const runtimeState = atom<StdRangeFilter>({
  key: "runtime",
  default: {
    enabled: false,
    value: {
      min: 60,
      max: 120,
    },
  },
});
