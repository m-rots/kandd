import { AnimatePresence } from 'framer-motion';
import { Modal } from 'interfaces';
import { useRecoilValue } from 'recoil';
import RangeModal from './range';
import {
  modalState,
  ratingState,
  releaseYearState,
  runtimeState,
} from 'lib/state';

const CurrentModal = () => {
  const modal = useRecoilValue(modalState)

  return (
    <AnimatePresence>
      {modal == Modal.Rating && (
        <RangeModal name="Rating" state={ratingState} min={1} max={10} step={0.1} />
      )}
      {modal == Modal.ReleaseYear && (
        <RangeModal name="Release Year" state={releaseYearState} min={1932} max={2020} step={1} />
      )}
      {modal == Modal.Runtime && (
        <RangeModal name="Runtime" state={runtimeState} min={1} max={200} step={1} />
      )}
    </AnimatePresence>
  )
}

export default CurrentModal;