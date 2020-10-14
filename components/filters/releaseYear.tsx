import { releaseYearState } from 'lib/state';
import { useRecoilState } from 'recoil';
import styles from './filter.module.css';

const ReleaseYearFilter = () => {
  const [releaseYear, setReleaseYear] = useRecoilState(releaseYearState);

  if (!releaseYear) {
    return null
  }

  const onClick = () => {
    setReleaseYear((cur) => cur - 1)
  }

  return (
    <span onClick={onClick} className={styles.block}>
      released in <span className={styles.value}>{releaseYear}</span>
    </span>
  )
}

export default ReleaseYearFilter;
