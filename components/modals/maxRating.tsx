import { maxRatingState, minRatingState } from 'lib/state';
import { useRecoilState, useRecoilValue } from 'recoil';
import Modal from './modal';

import styles from './range.module.css';

const MaxRatingModal = () => {
  const [maxRating, setMaxRating] = useRecoilState(maxRatingState);
  const minRating = useRecoilValue(minRatingState);

  const handleChange = (event) => {
    setMaxRating(event.target.value)
  }

  return (
    <Modal filter="Maximum rating" remove={() => setMaxRating(0)}>
      <div className={styles.range}>
        <span>{maxRating}</span>
        <input type="range" step={0.1} min={minRating} max={10} value={maxRating} onChange={handleChange} />
      </div>
    </Modal>
  )
}

export default MaxRatingModal;