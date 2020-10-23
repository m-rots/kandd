import { isNumber, isRange, StdRangeFilter } from 'interfaces/range';
import { RecoilState, useRecoilState, useResetRecoilState } from 'recoil';
import Modal from './modal';

import styles from './range.module.css';

type Props = {
  name: string,
  state: RecoilState<StdRangeFilter>,
  min: number,
  max: number,
  step: number,
}

const RangeModal = (props: Props) => {
  const [range, setRange] = useRecoilState(props.state);
  const resetState = useResetRecoilState(props.state);

  const handleSingle = (event) => {
    setRange({
      enabled: true,
      value: parseFloat(event.target.value),
    })
  }

  const handleMin = (event) => {
    if (isRange(range)) {
      setRange({
        enabled: true,
        value: {
          min: parseFloat(event.target.value),
          max: range.value.max,
        }
      })
    }
  }

  const handleMax = (event) => {
    if (isRange(range)) {
      setRange({
        enabled: true,
        value: {
          max: parseFloat(event.target.value),
          min: range.value.min,
        },
      })
    }
  }

  const toggleRange = () => {
    if (isNumber(range)) {
      setRange({
        enabled: true,
        value: {
          min: range.value,
          max: props.max,
        }
      })
    }
  }

  const toggleValue = () => {
    if (isRange(range)) {
      setRange({
        enabled: true,
        value: range.value.min,
      })
    }
  }

  const buttonClass = (isSelected: boolean): string => {
    if (isSelected) {
      return `${styles.button} ${styles.selected}`;
    }

    return styles.button
  }

  return (
    <Modal name={props.name} remove={() => resetState()}>
      <div className={styles.range}>
        {isRange(range)
          ? <span>{range.value.min} & {range.value.max}</span>
          : <span>{range.value}</span>
        }
        <div className={styles.toggle}>
          <button onClick={toggleValue} className={buttonClass(isNumber(range))}>Value</button>
          <button onClick={toggleRange} className={buttonClass(isRange(range))}>Range</button>
        </div>
        {isRange(range)
          ? (
            <>
              <input type="range" step={props.step} min={props.min} max={range.value.max} value={range.value.min} onChange={handleMin} />
              <input type="range" step={props.step} min={range.value.min} max={props.max} value={range.value.max} onChange={handleMax} />
            </>
          )
          : (
            <>
              <input type="range" step={props.step} min={props.min} max={props.max} value={range.value} onChange={handleSingle} />
            </>
          )
        }
      </div>
    </Modal>
  )
}

export default RangeModal;