import { Modal } from 'interfaces';
import { isNumber } from 'interfaces/range';
import { modalState, releaseYearState } from 'lib/state';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styles from './filter.module.css';

const RatingFilter = () => {
  const [releaseYear, setReleaseYear] = useRecoilState(releaseYearState);
  const setModal = useSetRecoilState(modalState);

  if (!releaseYear.enabled) {
    return null
  }

  const openModal = () => {
    setModal(Modal.ReleaseYear)
    setReleaseYear((cur) => ({
      ...cur,
      enabled: true,
    }))
  }

  if (isNumber(releaseYear)) {
    return (
      <span className={styles.block}>
        released in <span onClick={openModal} className={styles.value}>{releaseYear.value}</span>
      </span>
    )
  }

  return (
    <span className={styles.block}>
      released between
      <span onClick={openModal} className={styles.value}> {releaseYear.value.min} and {releaseYear.value.max}</span>
    </span>
  )
}

export default RatingFilter;
