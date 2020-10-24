import { Modal } from 'interfaces';
import { actorState, modalState } from 'lib/state';
import { Fragment } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styles from './filter.module.css';

const ActorsFilter = () => {
  const [actors, setActors] = useRecoilState(actorState);
  const setModal = useSetRecoilState(modalState);

  if (actors.value.length == 0) {
    return null
  }

  const seperator = (index: number): string => {
    if (index == actors.value.length - 2) {
      return " and "
    }

    if (index < actors.value.length - 2) {
      return ", "
    }

    return ""
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
          {seperator(index)}
        </Fragment>
      ))}
    </span>
  )
}

export default ActorsFilter;
