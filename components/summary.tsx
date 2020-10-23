import styles from './summary.module.css';

import ReleaseYear from 'components/filters/releaseYear';
import Rating from 'components/filters/rating';
import DirectedBy from 'components/filters/directedBy';
import { Fragment } from 'react';
import FilterButton from './filterButton';
import { useRecoilValue } from 'recoil';
import { modalState, ratingState, releaseYearState } from 'lib/state';
import { Modal } from 'interfaces';

const Summary = () => {
  const modal = useRecoilValue(modalState);
  const modalActive = modal != Modal.None;

  let className = styles.filterSelection;
  if (modalActive) {
    className += ` ${styles.inactive}`;
  }

  const filters = [
    ReleaseYear,
    DirectedBy,
    Rating,
  ];

  return (
    <div className={styles.summary}>
      <h1 className={styles.title}>Netflix & Chill</h1>

      <span className={styles.text}>
        I am looking for a film{' '}
        {filters
          .filter((filter) => filter() != null)
          .map((FilterBlock, index, me) => {
            return (
              <Fragment key={index}>
                <FilterBlock />{index == me.length - 1 ? '.' : ', '}
              </Fragment>
            )
          })}
      </span>

      <div className={className}>
        <FilterButton state={releaseYearState} modal={Modal.ReleaseYear}>Release Year</FilterButton>
        <FilterButton state={ratingState} modal={Modal.Rating}>Rating</FilterButton>
      </div>
    </div>
  );
}

export default Summary;