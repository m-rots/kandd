import { maxRatingState, minRatingState } from 'lib/state';
import { useRecoilState, useRecoilValue } from 'recoil';
import Modal from './modal';

import styles from './range.module.css';

const MinRatingModal = () => {
  const [minRating, setMinRating] = useRecoilState(minRatingState);
  const maxRating = useRecoilValue(maxRatingState);

  const handleChange = (event) => {
    setMinRating(event.target.value)
  }

  return (
    <Modal filter="Minimum rating" remove={() => setMinRating(0)}>
      <div className={styles.range}>
        <span>{minRating}</span>
        <input type="range" step={0.1} min={1} max={maxRating} value={minRating} onChange={handleChange} />
      </div>
    </Modal>
  )
}

export default MinRatingModal;