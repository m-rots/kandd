import { Modal } from 'interfaces';
import { modalState } from 'lib/state';
import { ReactNode } from 'react';
import { RecoilState, useRecoilValue, useRecoilState } from 'recoil';
import styles from './addition.module.css';

type Props = {
  children: ReactNode,
  state: RecoilState<boolean>,
}

const PropertyAddition = (props: Props) => {
  const [state, setState] = useRecoilState(props.state);
  const modal = useRecoilValue(modalState);
  const modalActive = modal != Modal.None;

  let className = styles.button;
  if (modalActive) {
    className += ` ${styles.inactive}`;
  }

  const onClick = () => {
    setState(true);
  }

  if (state) {
    return null;
  }

  return (
    <button className={className} onClick={onClick} disabled={modalActive}>
      {props.children}
    </button>
  )
}

export default PropertyAddition;