import styles from './summary.module.css';

import ReleaseYear from 'components/filters/releaseYear';
import Rating from 'components/filters/rating';
import DirectedBy from 'components/filters/directedBy';
import { Fragment } from 'react';

const Summary = () => {
  const filters = [
    ReleaseYear,
    DirectedBy,
    Rating,
  ];

  return (
    <div className={styles.summary}>
      <span className={styles.text}>
        I am looking for a film{' '}
        {filters.map((FilterBlock, index) => {
          if (FilterBlock() == null) {
            return null
          }

          return (
            <Fragment key={index}>
              <FilterBlock />{index == filters.length - 1 ? '.' : ', '}
            </Fragment>
          )
        })}
      </span>
    </div>
  );
}

export default Summary;