import { atom, selector } from 'recoil';
import axios from 'axios';
import { Person } from 'interfaces/multiple';
import { actorState } from 'lib/state';
import { Gender } from 'interfaces';

function getQuery(filters: string[]): string {
  return `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX media: <https://m-rots.com/media#>
PREFIX imdb: <https://www.imdb.com/interfaces/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT DISTINCT ?imdb ?name WHERE {
  ?person rdf:type media:Actor .
  ?person imdb:id ?imdb .
  ?person imdb:name ?name .
  ${filters.join(" .\n")}
}
ORDER BY ASC(?name)
LIMIT 100`;
}

export const actorQueryState = selector<string>({
  key: "actorQuery",
  get: ({ get }) => {
    const filters = [];

    const gender = get(actorGenderState);
    if (gender !== Gender.None) {
      filters.push(`?person foaf:gender "${gender}"`);
    }

    const actors = get(actorState);
    actors.value.forEach(({ imdb }) => {
      filters.push(`MINUS { ?person imdb:id "${imdb}" }`)
    })

    const search = get(actorSearchState);
    if (search !== "") {
      filters.push(`FILTER CONTAINS( LCASE(?name), LCASE("${search}") )`)
    }

    return getQuery(filters)
  }
})

export const actorSearchState = atom<string>({
  key: "actorSearch",
  default: "",
});

export const actorGenderState = atom<Gender>({
  key: "actorGender",
  default: Gender.None,
});

export type Response = {
  results: {
    bindings: {
      imdb: {
        value: string
      },
      name: {
        value: string
      },
    }[]
  }
}

export const actorResultsState = selector({
  key: "actorResults",
  get: async ({ get }) => {
    const query = get(actorQueryState);
    console.log(query);

    const { data } = await axios.get<Response>("http://localhost:7200/repositories/imdb", {
      params: {
        query,
      },
    });

    const directors: Person[] = data.results.bindings.map((binding) => ({
      imdb: binding.imdb.value,
      name: binding.name.value,
    }));

    return directors;
  },
})