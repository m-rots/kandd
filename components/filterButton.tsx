import { Modal } from 'interfaces';
import { StdRangeFilter } from 'interfaces/range';
import { modalState } from 'lib/state';
import { ReactNode } from 'react';
import { RecoilState, useRecoilState } from 'recoil';
import styles from './filterButton.module.css';

type Props = {
  children: ReactNode,
  modal: Modal,
  state: RecoilState<StdRangeFilter>,
}

const FilterButton = (props: Props) => {
  const [state, setState] = useRecoilState(props.state);
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
      enabled: true,
    }))
  }

  if (state.enabled) {
    return null
  }

  return (
    <button className={className} onClick={onClick} disabled={modalActive}>
      {props.children}
    </button>
  )
}

export default FilterButton;