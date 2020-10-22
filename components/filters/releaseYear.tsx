import { Modal } from 'interfaces';
import { modalState, releaseYearState } from 'lib/state';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styles from './filter.module.css';

const ReleaseYearFilter = () => {
  const releaseYear = useRecoilValue(releaseYearState);
  const setModal = useSetRecoilState(modalState);

  if (!releaseYear) {
    return null
  }

  const onClick = () => {
    setModal(Modal.ReleaseYear);
  }

  return (
    <span className={styles.block}>
      released in <span onClick={onClick} className={styles.value}>{releaseYear}</span>
    </span>
  )
}

export default ReleaseYearFilter;
