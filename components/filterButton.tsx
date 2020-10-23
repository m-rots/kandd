import { Modal } from 'interfaces';
import { StdRangeFilter } from 'interfaces/range';
import { modalState } from 'lib/state';
import { ReactNode } from 'react';
import { RecoilState, useRecoilState, useSetRecoilState } from 'recoil';
import styles from './filterButton.module.css';

type Props = {
  children: ReactNode,
  modal: Modal,
  state: RecoilState<StdRangeFilter>,
}

const FilterButton = (props: Props) => {
  const [modal, setModal] = useRecoilState(modalState);
  const modalActive = modal != Modal.None;

  const setState = useSetRecoilState(props.state);

  let className = styles.button;
  if (modalActive) {
    className += ` ${styles.inactive}`;
  }

  const onClick = () => {
    setModal(props.modal)
    setState((cur) => ({
      ...cur,
      enabled: true,
    }))
  }

  return (
    <button className={className} onClick={onClick} disabled={modalActive}>
      {props.children}
    </button>
  )
}

export default FilterButton;