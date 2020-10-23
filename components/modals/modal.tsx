import { motion } from 'framer-motion';
import { modalState } from 'lib/state';
import { ReactNode } from 'react';
import { useResetRecoilState } from 'recoil';

import styles from './modal.module.css';

type Props = {
  name: string,
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
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className={styles.content}>
        <h3>{props.name}</h3>
        {props.children}
        <button onClick={() => closeModal()}>Close</button>
      </div>
      <motion.div
        className={styles.delete}
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        <button onClick={removeFilter}>Remove filter</button>
      </motion.div>
    </motion.div>
  );
}

export default Modal;