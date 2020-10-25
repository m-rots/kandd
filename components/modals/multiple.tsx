import Modal from 'components/modals/modal';
import { Modal as ModalEnum } from 'interfaces';
import { Multiple } from 'interfaces/multiple';
import { modalState } from 'lib/state';
import { withSpace } from 'lib/util';
import { RecoilState, useRecoilState, useSetRecoilState } from 'recoil';

import styles from './multiple.module.css';

type Props = {
  name: string,
  space?: boolean,
  state: RecoilState<Multiple>,
  values: string[],
}

const MultipleModal = (props: Props) => {
  const setModal = useSetRecoilState(modalState);
  const [multiple, setMultiple] = useRecoilState(props.state);
  const { selected } = multiple;

  const editSelected = (newValue: string) => {
    setModal(ModalEnum.None)
    
    setMultiple({
      selected: "",
      value: [
        ...multiple.value.filter((value) => value != selected),
        newValue,
      ],
    });
  }

  const removeSelected = () => {
    setMultiple({
      selected: "",
      value: multiple.value.filter((value) => value != selected),
    });
  }

  return (
    <Modal name={name} remove={removeSelected}>
      <div className={styles.content}>
        {props.values.filter((value) => !multiple.value.includes(value)).map(
          (value) => (
            <button onClick={() => editSelected(value)} className={styles.value}>{props.space ? withSpace(value) : value}</button>
          )
        )}
      </div>
    </Modal>
  )
}

export default MultipleModal;