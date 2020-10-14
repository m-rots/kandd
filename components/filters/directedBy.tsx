import { directorsState } from 'lib/state';
import { Fragment } from 'react';
import { useRecoilState } from 'recoil';
import styles from './filter.module.css';

const DirectedByFilter = () => {
  const [directors, setDirectors] = useRecoilState(directorsState);

  if (directors.length == 0) {
    return null
  }

  const seperator = (index: number): string => {
    if (index == directors.length - 2) {
      return " and "
    }

    if (index < directors.length - 2) {
      return ", "
    }

    return ""
  }

  return (
    <span className={styles.block}>
      directed by
      {' '}
      {directors.map((director, index) => (
        <Fragment key={director.imdb}>
          <span className={styles.value}>{director.name}</span>
          {seperator(index)}
        </Fragment>
      ))}
    </span>
  )
}

export default DirectedByFilter;
