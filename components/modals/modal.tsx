import { modalState } from 'lib/state';
import { ReactNode } from 'react';
import { useResetRecoilState } from 'recoil';

import styles from './modal.module.css';

type Props = {
  filter: string,
  children: ReactNode,
  remove: () => void,
}

const Modal = (props: Props) => {
  const closeModal = useResetRecoilState(modalState);

  const removeFilter = () => {
    props.remove()
    closeModal()
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h3>{props.filter}</h3>
        {props.children}
        <button onClick={() => closeModal()}>Close</button>
      </div>
      <div className={styles.delete}>
        <button onClick={removeFilter}>Remove filter</button>
      </div>
    </div>
  );
}

export default Modal;