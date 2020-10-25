import { atom, selector } from 'recoil';
import axios from 'axios';
import { Person } from 'interfaces/multiple';

function getQuery(filters: string[]): string {
  return `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX media: <https://m-rots.com/media#>
PREFIX imdb: <https://www.imdb.com/interfaces/>

SELECT DISTINCT ?imdb ?name WHERE {
  ?person rdf:type media:Actor .
  ?person imdb:id ?imdb .
  ?person imdb:name ?name .
  ${filters.join(" .\n")}
}
ORDER BY ASC(?name)
`;
}

export const actorQueryState = selector<string>({
  key: "actorQuery",
  get: ({ get }) => {
    const filters = [];

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