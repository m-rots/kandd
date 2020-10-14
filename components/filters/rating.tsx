import { minRatingState, maxRatingState } from 'lib/state';
import { useRecoilValue } from 'recoil';
import styles from './filter.module.css';

const RatingFilter = () => {
  const minRating = useRecoilValue(minRatingState);
  const maxRating = useRecoilValue(maxRatingState);

  if (!minRating && !maxRating) {
    return null
  }

  if (!maxRating) {
    return (
      <span className={styles.block}>
        with a minimum rating of <span className={styles.value}>{minRating}</span>
      </span>
    )
  }

  if (!minRating) {
    return (
      <span className={styles.block}>
        with a maximum rating of <span className={styles.value}>{maxRating}</span>
      </span>
    )
  }

  return (
    <span className={styles.block}>
      with a minimum rating of <span className={styles.value}>{minRating}</span>
      {' '}
      and a maximum rating of <span className={styles.value}>{maxRating}</span>
    </span>
  )
}

export default RatingFilter;
