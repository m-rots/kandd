import Head from 'next/head';
import styles from './index.module.css';

import Summary from 'components/summary';
import Poster from "components/poster";
import CurrentModal from "components/modals";
import { Film } from "interfaces";
import mainQueryState from "lib/queries/main"
import { filmsState, loadingState } from "lib/state"
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
  const [loading, setLoading] = useRecoilState(loadingState)
  const query = useRecoilValue(mainQueryState)

  const loadFilms = (trackID: string, source: CancelTokenSource) => {
    setLoading(true);
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
      setLoading(false);
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

    let sent = false;

    const timeout = setTimeout(() => {
      sent = true;
      loadFilms(trackID, source)
    }, 100)

    return () => {
      clearTimeout(timeout)
      source.cancel()
      if (sent) {
        cancelQuery(trackID);
      }
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
        {loading && <div className={styles.loading}>Loading...</div>}
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
