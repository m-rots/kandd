import { Modal } from 'interfaces';
import { actorState, modalState } from 'lib/state';
import { seperator } from 'lib/util';
import { Fragment } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styles from './filter.module.css';

const ActorsFilter = () => {
  const [actors, setActors] = useRecoilState(actorState);
  const setModal = useSetRecoilState(modalState);

  if (actors.value.length == 0) {
    return null
  }

  const openModal = (imdb: string) => {
    setModal(Modal.Actor)
    setActors((cur) => ({
      ...cur,
      selected: imdb,
    }))
  }

  return (
    <span className={styles.block}>
      featuring
      {' '}
      {actors.value.map(({ imdb, name }, index) => (
        <Fragment key={imdb}>
          <span onClick={() => openModal(imdb)} className={styles.value}>{name}</span>
          {seperator(actors.value.length, index)}
        </Fragment>
      ))}
    </span>
  )
}

export default ActorsFilter;
