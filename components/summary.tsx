import styles from './summary.module.css';

import ReleaseYear from 'components/filters/releaseYear';
import Rating from 'components/filters/rating';
import Runtime from 'components/filters/runtime';
import DirectedBy from 'components/filters/directedBy';
import { Fragment } from 'react';
import FilterButton from './filterButton';
import { useRecoilValue } from 'recoil';
import { Modal } from 'interfaces';
import {
  modalState,
  ratingState,
  releaseYearState,
  runtimeState,
} from 'lib/state';

const Summary = () => {
  const modal = useRecoilValue(modalState);
  const modalActive = modal != Modal.None;

  let className = styles.filterSelection;
  if (modalActive) {
    className += ` ${styles.inactive}`;
  }

  const filters = [
    DirectedBy,
    Rating,
    ReleaseYear,
    Runtime,
  ];

  return (
    <div className={styles.summary}>
      <h1 className={styles.title}>Netflix & Chill</h1>

      <span className={styles.text}>
        I am looking for a film
        {filters
          .filter((filter) => filter() != null)
          .map((FilterBlock, index, me) => {
            return (
              <Fragment key={index}>
                {' '}<FilterBlock />{index == me.length - 1 ? '' : ','}
              </Fragment>
            )
          })}
          .
      </span>

      <div className={className}>
        <FilterButton state={ratingState} modal={Modal.Rating}>Rating</FilterButton>
        <FilterButton state={releaseYearState} modal={Modal.ReleaseYear}>Release Year</FilterButton>
        <FilterButton state={runtimeState} modal={Modal.Runtime}>Runtime</FilterButton>
      </div>
    </div>
  );
}

export default Summary;