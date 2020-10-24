import { Modal } from 'interfaces';
import { Persons } from 'interfaces/multiple';
import { modalState } from 'lib/state';
import { ReactNode } from 'react';
import { RecoilState, useRecoilState, useSetRecoilState } from 'recoil';
import styles from './addition.module.css';

type Props = {
  children: ReactNode,
  modal: Modal,
  state: RecoilState<Persons>,
}

const PersonAddition = (props: Props) => {
  const setState = useSetRecoilState(props.state);
  const [modal, setModal] = useRecoilState(modalState);
  const modalActive = modal != Modal.None;

  let className = styles.button;
  if (modalActive) {
    className += ` ${styles.inactive}`;
  }

  const onClick = () => {
    setModal(props.modal)
    setState((cur) => ({
      ...cur,
      selected: "",
    }));
  }

  return (
    <button className={className} onClick={onClick} disabled={modalActive}>
      {props.children}
    </button>
  )
}

export default PersonAddition;