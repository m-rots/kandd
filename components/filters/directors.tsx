import { Modal } from 'interfaces';
import { directorState, modalState } from 'lib/state';
import { Fragment } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styles from './filter.module.css';

const DirectorsFilter = () => {
  const [directors, setDirectors] = useRecoilState(directorState);
  const setModal = useSetRecoilState(modalState);

  if (directors.value.length == 0) {
    return null
  }

  const seperator = (index: number): string => {
    if (index == directors.value.length - 2) {
      return " and "
    }

    if (index < directors.value.length - 2) {
      return ", "
    }

    return ""
  }

  const openModal = (imdb: string) => {
    setModal(Modal.Director)
    setDirectors((cur) => ({
      ...cur,
      selected: imdb,
    }))
  }

  return (
    <span className={styles.block}>
      directed by
      {' '}
      {directors.value.map(({ imdb, name }, index) => (
        <Fragment key={imdb}>
          <span onClick={() => openModal(imdb)} className={styles.value}>{name}</span>
          {seperator(index)}
        </Fragment>
      ))}
    </span>
  )
}

export default DirectorsFilter;
