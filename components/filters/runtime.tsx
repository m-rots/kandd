import { Modal } from 'interfaces';
import { isNumber } from 'interfaces/range';
import { modalState, runtimeState } from 'lib/state';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styles from './filter.module.css';

const RuntimeFilter = () => {
  const [runtime, setRuntime] = useRecoilState(runtimeState);
  const setModal = useSetRecoilState(modalState);

  if (!runtime.enabled) {
    return null
  }

  const openModal = () => {
    setModal(Modal.Runtime)
    setRuntime((cur) => ({
      ...cur,
      enabled: true,
    }))
  }

  if (isNumber(runtime)) {
    return (
      <span className={styles.block}>
        with a runtime of <span onClick={openModal} className={styles.value}>{runtime.value} minutes</span>
      </span>
    )
  }

  return (
      <span className={styles.block}>
        with a runtime between
        <span onClick={openModal} className={styles.value}> {runtime.value.min} and {runtime.value.max} minutes</span>
      </span>
      
    
  )
}

export default RuntimeFilter;
