import { Film } from 'interfaces';
import styles from './poster.module.css';

const Poster = (props: Film) => {
  return (
    <div className={styles.poster}>
      <a href={`https://www.imdb.com/title/${props.imdb}/`} target="_blank" rel="noopener">
        <img src={`https://image.tmdb.org/t/p/w342${props.poster}`} alt={props.title} loading="lazy" />
      </a>
    </div>
  );
}

export default Poster;