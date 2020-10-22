import { releaseYearState } from 'lib/state';
import { useRecoilState } from 'recoil';
import Modal from './modal';

import styles from './range.module.css';

const ReleaseYearModal = () => {
  const [releaseYear, setReleaseYear] = useRecoilState(releaseYearState);

  const handleChange = (event) => {
    setReleaseYear(event.target.value)
  }

  return (
    <Modal filter="Release Year" remove={() => setReleaseYear(0)}>
      <div className={styles.range}>
        <span>{releaseYear}</span>
        <input type="range" min={1932} max={2020} value={releaseYear} onChange={handleChange} />
      </div>
    </Modal>
  )
}

export default ReleaseYearModal;