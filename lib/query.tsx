import { atom, selector } from 'recoil';
import { directorsState, maxRatingState, minRatingState, releaseYearState } from './state';

function getQuery(filters: string[]): string {
  return encodeURI(`
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    PREFIX imdb: <https://www.imdb.com/interfaces/>
    PREFIX imn: <https://www.imdb.com/name/>

    SELECT ?film ?title ?year ?rating WHERE {
      ?film imdb:title ?title .
      ?film imdb:year ?year .
      ?film imdb:rating ?rating .
      ?film imdb:votes ?votes .
      FILTER (?votes >= 5000)
      ${filters.join(" .\n")}
    }
    ORDER BY DESC(?rating)
    LIMIT 18
  `).replace(/#/g, '%23');
}

export const queryState = selector<string>({
  key: 'query',
  get: ({ get }) => {
    const filters = [];

    const releaseYear = get(releaseYearState);
    if (releaseYear) {
      filters.push(`?film imdb:year ${releaseYear}`)
    }

    const directors = get(directorsState);
    directors.forEach((director) => {
      filters.push(`?film imdb:director imn:${director.imdb}`)
    })

    const minRating = get(minRatingState);
    if (minRating) {
      filters.push(`FILTER (?rating >= "${minRating}"^^xsd:decimal)`)
    }

    const maxRating = get(maxRatingState);
    if (maxRating) {
      filters.push(`FILTER (?rating <= "${maxRating}"^^xsd:decimal)`)
    }

    return getQuery(filters)
  }
})