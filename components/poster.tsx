import { Film } from 'interfaces';
import styles from './poster.module.css';

const Poster = (props: Film) => {
  return (
    <div className={styles.poster}>
      <a href={`https://www.imdb.com/title/${props.imdb}/`} target="_blank" rel="noopener">
        <img src={`/api/posters/${props.imdb}`} alt={props.title} />
      </a>
    </div>
  );
}

export default Poster;