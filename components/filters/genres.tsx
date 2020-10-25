import { Modal } from 'interfaces';
import { genreState, modalState } from 'lib/state';
import { seperator, withSpace } from 'lib/util';
import { Fragment } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styles from './filter.module.css';

const addN = (word: string) => {
  if (word && word[0] == "A") {
    return "n"
  }

  return ""
}

const GenresFilter = () => {
  const [genres, setGenres] = useRecoilState(genreState);
  const setModal = useSetRecoilState(modalState);

  if (genres.value.length == 0) {
    return null
  }

  const openModal = (genre: string) => {
    setModal(Modal.Genre)
    setGenres((cur) => ({
      ...cur,
      selected: genre,
    }))
  }

  return (
    <span>
      {genres.value.length > 0 && addN(genres.value[0])}
      {' '}
      {genres.value.map((genre, index) => (
        <Fragment key={genre}>
          <span onClick={() => openModal(genre)} className={styles.value}>{withSpace(genre)}</span>
          {seperator(genres.value.length, index)}
        </Fragment>
      ))}
    </span>
  )
}

export default GenresFilter;
