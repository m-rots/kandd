import Head from 'next/head';
import styles from './index.module.css';

import Summary from 'components/summary';
import Poster from "components/poster";
import CurrentModal from "components/modals";
import { Film } from "interfaces";
import { queryState } from "lib/query"
import { filmsState } from "lib/state"
import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';
import { nanoid } from 'nanoid';

type Response = {
  results: {
    bindings: {
      poster: {
        value: string
      },
      imdb: {
        value: string
      },
      title: {
        value: string
      },
    }[]
  }
}

const Home = () => {
  const [films, setFilms] = useRecoilState(filmsState)
  const query = useRecoilValue(queryState)

  const loadFilms = (trackID: string, source: CancelTokenSource) => {
    axios.get<Response>(`http://localhost:7200/repositories/imdb?query=${query}`, {
      cancelToken: source.token,
      headers: {
        'X-GraphDB-Track-Alias': trackID,
      },
    }).then(({ data }) => {
      const films = data.results.bindings.map(
        (binding) => {
          const film: Film = {
            poster: binding.poster.value,
            imdb: binding.imdb.value,
            title: binding.title.value,
          }
  
          return film
        }
      )
  
      setFilms(films);
    })
    .catch((err) => {
      if (!axios.isCancel(err)) {
        throw err
      }
    })
  }

  const cancelQuery = (trackID: string) => {
    axios.delete("http://localhost:7200/rest/monitor/query", {
      params: {
        queryAlias: trackID,
      },
      headers: {
        'X-GraphDB-Repository': 'imdb',
      },
    })
  }

  useEffect(() => {
    const source = axios.CancelToken.source()
    const trackID = `kandd-${nanoid()}`;

    const timeout = setTimeout(() => {
      loadFilms(trackID, source)
    }, 250)

    return () => {
      clearTimeout(timeout)
      source.cancel()
      cancelQuery(trackID);
    }
  }, [query]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix & Chill</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.filters}>
        <Summary />
        <CurrentModal />
      </div>
      <div className={styles.posters}>
        <div className={styles.posterGrid}>
          {
            films.map(
              (film) => <Poster imdb={film.imdb} title={film.title} poster={film.poster} key={film.imdb} />,
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Home;
