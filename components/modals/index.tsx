import { AnimatePresence } from 'framer-motion';
import { Modal } from 'interfaces';
import { modalState, ratingState, releaseYearState } from 'lib/state';
import { useRecoilValue } from 'recoil';
import RangeModal from './range';

const CurrentModal = () => {
  const modal = useRecoilValue(modalState)

  return (
    <AnimatePresence>
      {modal == Modal.ReleaseYear && (
        <RangeModal name="Release Year" state={releaseYearState} min={1932} max={2020} step={1} />
      )}
      {modal == Modal.Rating && (
        <RangeModal name="Rating" state={ratingState} min={1} max={10} step={0.1} />
      )}
    </AnimatePresence>
  )
}

export default CurrentModal;