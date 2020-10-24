import Modal from 'components/modals/modal';
import { Person, Persons } from 'interfaces/multiple';
import { RecoilState, RecoilValueReadOnly, useRecoilState, useRecoilValueLoadable } from 'recoil';
import Individual from './individual';
import styles from './index.module.css';

type Props = {
  name: string,
  state: RecoilState<Persons>,
  searchState: RecoilState<string>,
  resultState: RecoilValueReadOnly<Person[]>,
}

const PersonModal = (props: Props) => {
  const [search, setSearch] = useRecoilState(props.searchState);
  const results = useRecoilValueLoadable(props.resultState);
  const [persons, setPersons] = useRecoilState(props.state);
  const { selected } = persons;

  const removeSelected = () => {
    setPersons({
      selected: "",
      value: persons.value.filter(({ imdb }) => imdb != selected),
    });
  }

  const editSelected = (person: Person) => {
    setPersons({
      selected: person.imdb,
      value: [
        ...persons.value.filter(({ imdb }) => imdb != selected),
        person,
      ],
    });
  }

  const SearchResults = () => {
    if (results.state !== "hasValue") {
      return <div>Loading...</div>
    }

    return (
      <div className={styles.results}>
        <div>
          {results.contents.map(
            (person) => (
              <Individual
                key={person.imdb}
                name={person.name}
                onClick={() => editSelected(person)}
                selected={person.imdb === selected}
              />
            )
          )}
        </div>
      </div>
    )
  }

  return (
    <Modal name={props.name} remove={removeSelected}>
      <div className={styles.content}>
        <div className={styles.search}>
          <input type="text" value={search} onChange={(event) => setSearch(event.target.value)} />
        </div>
        <SearchResults />
      </div>
    </Modal>
  )
}

export default PersonModal;