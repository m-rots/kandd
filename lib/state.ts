import { atom } from 'recoil';
import { Film, Modal } from 'interfaces';
import { StdRangeFilter } from 'interfaces/range';
import { Persons } from 'interfaces/multiple';

export const modalState = atom<Modal>({
  key: "modal",
  default: Modal.None,
});

export const filmsState = atom<Film[]>({
  key: "films",
  default: [],
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

export const actorState = atom<Persons>({
  key: "actors",
  default: {
    selected: "",
    value: [],
  },
})

export const directorState = atom<Persons>({
  key: "directors",
  default: {
    selected: "",
    value: [],
  },
})