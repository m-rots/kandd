import { isNumber, isRange } from 'interfaces/range';
import { selector } from 'recoil';
import {
  directorsState,
  ratingState,
  releaseYearState,
  runtimeState,
} from 'lib/state';

function getQuery(filters: string[]): string {
  return encodeURI(`
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    PREFIX media: <https://m-rots.com/media#>
    PREFIX imdb: <https://www.imdb.com/interfaces/>
    PREFIX imn: <https://www.imdb.com/name/>
    PREFIX tmdb: <https://developers.themoviedb.org/3#>

    SELECT DISTINCT ?imdb ?title ?poster WHERE {
      ?film rdf:type media:Movie .
      ?film imdb:id ?imdb .
      ?film imdb:title ?title .
      ?film imdb:year ?year .
      ?film imdb:rating ?rating .
      ?film imdb:runtime ?runtime .
      ?film tmdb:poster ?poster .
      ${filters.join(" .\n")}
      MINUS {
        VALUES ?blacklist {"hi" "ml" "te" "ta" "tr" "ar" "kn" "ja" "si" "bn" "mr" "fa" "sr" } .
        ?film tmdb:lang ?blacklist .
      }
    }
    ORDER BY DESC(?rating) DESC(?year)
    LIMIT 100
  `).replace(/#/g, '%23');
}

export const queryState = selector<string>({
  key: 'query',
  get: ({ get }) => {
    const filters = [];

    // Directors
    const directors = get(directorsState);
    directors.forEach((director) => {
      filters.push(`?film imdb:director imn:${director.imdb}`)
    })

    // Rating
    const rating = get(ratingState);
    if (rating.enabled && isNumber(rating)) {
      filters.push(`FILTER (?rating = "${rating.value}"^^xsd:decimal)`)
    }

    if (rating.enabled && isRange(rating)) {
      filters.push(`FILTER (?rating >= "${rating.value.min}"^^xsd:decimal)`)
      filters.push(`FILTER (?rating <= "${rating.value.max}"^^xsd:decimal)`)
    }

    // Release Year
    const releaseYear = get(releaseYearState);
    if (releaseYear.enabled && isNumber(releaseYear)) {
      filters.push(`FILTER (?year = "${releaseYear.value}"^^xsd:decimal)`)
    }

    if (releaseYear.enabled && isRange(releaseYear)) {
      filters.push(`FILTER (?year >= "${releaseYear.value.min}"^^xsd:decimal)`)
      filters.push(`FILTER (?year <= "${releaseYear.value.max}"^^xsd:decimal)`)
    }

    // Runtime
    const runtime = get(runtimeState);
    if (runtime.enabled && isNumber(runtime)) {
      filters.push(`FILTER (?runtime = "${runtime.value}"^^xsd:decimal)`)
    }

    if (runtime.enabled && isRange(runtime)) {
      filters.push(`FILTER (?runtime >= "${runtime.value.min}"^^xsd:decimal)`)
      filters.push(`FILTER (?runtime <= "${runtime.value.max}"^^xsd:decimal)`)
    }

    return getQuery(filters)
  }
})