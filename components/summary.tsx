import styles from './summary.module.css';

import ReleaseYear from 'components/filters/releaseYear';
import Rating from 'components/filters/rating';
import Runtime from 'components/filters/runtime';
import ActorsFilter from './filters/actors';
import GenresFilter from './filters/genres';
import PropertiesFilter from './filters/properties';
import PropertyAddition from './additions/property';
import DirectorsFilter from 'components/filters/directors';
import { Fragment } from 'react';
import RangeAddition from './additions/range';
import PersonAddition from './additions/person';
import MultipleAddition from './additions/multiple';
import { useRecoilValue } from 'recoil';
import { Modal } from 'interfaces';
import {
  actorState,
  awardedState,
  directorState,
  femaleInclusiveState,
  genreState,
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
    PropertiesFilter,
    ActorsFilter,
    DirectorsFilter,
    Rating,
    ReleaseYear,
    Runtime,
  ];

  return (
    <div className={styles.summary}>
      <h1 className={styles.title}>Netflix & Chill</h1>

      <span className={styles.text}>
        I am looking for a<GenresFilter /> film
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
        <span>Add some <i>spicy</i> restrictions</span>
        <div className={styles.additions}>
          <PersonAddition state={actorState} modal={Modal.Actor}>Actor</PersonAddition>
          <PropertyAddition state={awardedState}>Awarded</PropertyAddition>
          <PersonAddition state={directorState} modal={Modal.Director}>Director</PersonAddition>
          <PropertyAddition state={femaleInclusiveState}>Female Inclusive</PropertyAddition>
          <MultipleAddition state={genreState} modal={Modal.Genre}>Genre</MultipleAddition>
          <RangeAddition state={ratingState} modal={Modal.Rating}>Rating</RangeAddition>
          <RangeAddition state={releaseYearState} modal={Modal.ReleaseYear}>Release Year</RangeAddition>
          <RangeAddition state={runtimeState} modal={Modal.Runtime}>Runtime</RangeAddition>
        </div>
      </div>
    </div>
  );
}

export default Summary;