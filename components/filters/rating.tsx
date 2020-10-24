import { Modal } from 'interfaces';
import { isNumber } from 'interfaces/range';
import { modalState, ratingState } from 'lib/state';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styles from './filter.module.css';

const RatingFilter = () => {
  const [rating, setRating] = useRecoilState(ratingState);
  const setModal = useSetRecoilState(modalState);

  if (!rating.enabled) {
    return null
  }

  const openModal = () => {
    setModal(Modal.Rating)
    setRating((cur) => ({
      ...cur,
      enabled: true,
    }))
  }

  if (isNumber(rating)) {
    return (
      <span className={styles.block}>
        with a rating of <span onClick={openModal} className={styles.value}>{rating.value}</span>
      </span>
    )
  }

  return (
    <span className={styles.block}>
      with a rating between
      <span onClick={openModal} className={styles.value}> {rating.value.min} and {rating.value.max}</span>
    </span>
  )
}

export default RatingFilter;
