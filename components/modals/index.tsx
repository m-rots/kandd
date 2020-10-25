import { AnimatePresence } from 'framer-motion';
import { Genres, Modal } from 'interfaces';
import { directorResultsState, directorSearchState } from 'lib/queries/directors';
import { useRecoilValue } from 'recoil';
import RangeModal from './range';
import PersonModal from './person';
import MultipleModal from './multiple';
import {
  actorState,
  directorState,
  genreState,
  modalState,
  ratingState,
  releaseYearState,
  runtimeState,
} from 'lib/state';
import { actorResultsState, actorSearchState } from 'lib/queries/actors';

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
        <RangeModal name="Runtime" state={runtimeState} min={1} max={247} step={1} />
      )}
      {modal == Modal.Actor && (
        <PersonModal
          name="Actor"
          state={actorState}
          searchState={actorSearchState}
          resultState={actorResultsState}
        />
      )}
      {modal == Modal.Director && (
        <PersonModal
          name="Director"
          state={directorState}
          searchState={directorSearchState}
          resultState={directorResultsState}
        />
      )}
      {modal === Modal.Genre && (
        <MultipleModal
          name="Genre"
          state={genreState}
          values={Genres}
          space
        />
      )}
    </AnimatePresence>
  )
}

export default CurrentModal;