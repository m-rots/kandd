import { Modal } from 'interfaces';
import { modalState } from 'lib/state';
import { useRecoilValue } from 'recoil';
import MaxRatingModal from './maxRating';
import MinRatingModal from './minRating';
import ReleaseYearModal from './releaseYear';

const CurrentModal = () => {
  const modal = useRecoilValue(modalState)

  switch (modal) {
    case Modal.ReleaseYear:
      return <ReleaseYearModal />
    case Modal.MinRating:
      return <MinRatingModal />
    case Modal.MaxRating:
      return <MaxRatingModal />
    default:
      return null
  }
}

export default CurrentModal;