import { Modal } from 'interfaces';
import { minRatingState, maxRatingState, modalState } from 'lib/state';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styles from './filter.module.css';

const RatingFilter = () => {
  const minRating = useRecoilValue(minRatingState);
  const maxRating = useRecoilValue(maxRatingState);
  const setModal = useSetRecoilState(modalState);

  if (!minRating && !maxRating) {
    return null
  }

  if (!maxRating) {
    return (
      <span className={styles.block}>
        with a minimum rating of <span onClick={() => setModal(Modal.MinRating)} className={styles.value}>{minRating}</span>
      </span>
    )
  }

  if (!minRating) {
    return (
      <span className={styles.block}>
        with a maximum rating of <span onClick={() => setModal(Modal.MaxRating)} className={styles.value}>{maxRating}</span>
      </span>
    )
  }

  return (
    <>
      <span className={styles.block}>
        with a minimum rating of <span onClick={() => setModal(Modal.MinRating)} className={styles.value}>{minRating}</span>
      </span>
      {' '}
      <span className={styles.block}>
        and a maximum rating of <span onClick={() => setModal(Modal.MaxRating)} className={styles.value}>{maxRating}</span>
      </span>
    </>
    
  )
}

export default RatingFilter;
