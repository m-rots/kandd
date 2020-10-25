import { useRecoilState } from 'recoil';
import { awardedState, femaleInclusiveState } from "lib/state";
import styles from './filter.module.css';

const PropertiesFilter = () => {
  const [awarded, setAwarded] = useRecoilState(awardedState);
  const [femaleInclusive, setFemaleInclusive] = useRecoilState(femaleInclusiveState);

  if (!awarded && !femaleInclusive) {
    return null;
  }

  const Awarded = () => (
    <span onClick={() => setAwarded(false)} className={styles.removable}> Awarded</span>
  )

  const FemaleInclusive = () => (
    <span onClick={() => setFemaleInclusive(false)} className={styles.removable}> Female Inclusive</span>
  )

  return (
    <span className={styles.block}>
      which is
      {awarded && <Awarded />}
      {(awarded && femaleInclusive) ? ' and' : ''}
      {femaleInclusive && <FemaleInclusive />}
    </span>
  )
}

export default PropertiesFilter;
