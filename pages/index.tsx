import Head from 'next/head';
import styles from './index.module.css';

import Summary from 'components/summary';
import Poster from "components/poster";
import { Film } from "interfaces";
import { queryState } from "lib/query"
import { filmsState } from "lib/state"
import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import axios from 'axios';

type Response = {
  results: {
    bindings: {
      film: {
        value: string
      }
      title: {
        value: string
      }
    }[]
  }
}

const Home = () => {
  const [films, setFilms] = useRecoilState(filmsState)
  const query = useRecoilValue(queryState)

  const loadFilms = async () => {
    const { data } = await axios.get<Response>(`http://localhost:7200/repositories/imdb?query=${query}`)
    const films = data.results.bindings.map(
      (binding) => {
        const parts = binding.film.value.split("/");
        const film: Film = {
          imdb: parts[parts.length - 1],
          title: binding.title.value,
        }

        return film
      }
    )

    console.log(films)
    setFilms(films);
  }

  useEffect(() => {
    loadFilms()
  }, [query]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Content Discovery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.filters}>
        <h1>Netflix & Chill</h1>
        <Summary />
      </div>
      <div className={styles.posters}>
        {
          films.map(
            (film) => <Poster imdb={film.imdb} title={film.title} key={film.imdb} />,
          )
        }
      </div>
    </div>
  )
}

export default Home;
