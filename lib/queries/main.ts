import { isNumber, isRange } from 'interfaces/range';
import { selector } from 'recoil';
import {
  actorState,
  awardedState,
  directorState,
  femaleInclusiveState,
  genreState,
  ratingState,
  releaseYearState,
  runtimeState,
} from 'lib/state';

function getQuery(filters: string[]): string {
  return `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

PREFIX media: <https://m-rots.com/media#>
PREFIX imdb: <https://www.imdb.com/interfaces/>
PREFIX imn: <https://www.imdb.com/name/>
PREFIX tmdb: <https://developers.themoviedb.org/3#>

SELECT DISTINCT ?imdb ?title ?poster WHERE {
  ?film rdf:type media:Movie .
  ?film media:full_title ?title .
  ?film media:release_year ?year .
  ?film media:runtime ?runtime .
  ?film imdb:id ?imdb .
  ?film imdb:rating ?rating .
  ?film tmdb:poster ?poster .
  ${filters.join(" .\n  ")}
  MINUS {
    VALUES ?blacklist {"hi" "ml" "te" "ta" "tr" "ar" "kn" "ja" "si" "bn" "mr" "fa" "sr" } .
    ?film tmdb:lang ?blacklist .
  }
}
ORDER BY DESC(?rating) DESC(?year)
LIMIT 100`
}

const mainQuery = selector<string>({
  key: 'query',
  get: ({ get }) => {
    const filters = [];

    // Awarded
    const awarded = get(awardedState);
    if (awarded) {
      filters.push(`?film rdf:type media:AwardedMovie`)
    }

    // Female Inclusive
    const femaleInclusive = get(femaleInclusiveState);
    if (femaleInclusive) {
      filters.push(`?film rdf:type media:FemaleInclusiveMovie`)
    }

    // Actors
    const actors = get(actorState);
    actors.value.forEach(({ imdb }) => {
      filters.push(`{ ?film media:has_actress imn:${imdb} } UNION { ?film media:has_actor imn:${imdb}}`)
    })

    // Directors
    const directors = get(directorState);
    directors.value.forEach(({ imdb }) => {
      filters.push(`?film media:has_director imn:${imdb}`)
    })

    // Genres
    const genres = get(genreState);
    genres.value.forEach((genre) => {
      filters.push(`?film rdf:type media:${genre}Movie`)
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

export default mainQuery;