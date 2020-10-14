import { Film } from 'interfaces';
import styles from './poster.module.css';

const Poster = (props: Film) => {
  return (
    <div className={styles.poster}>
      <img src={`/api/posters/${props.imdb}`} alt={props.title} />
    </div>
  );
}

export default Poster;