import Modal from 'components/modals/modal';
import { Gender, Modal as ModalEnum } from 'interfaces'
import { Person, Persons } from 'interfaces/multiple';
import { RecoilState, RecoilValueReadOnly, useRecoilState, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import Individual from './individual';
import styles from './index.module.css';
import { modalState } from 'lib/state';

type Props = {
  name: string,
  state: RecoilState<Persons>,
  genderState?: RecoilState<Gender>,
  searchState: RecoilState<string>,
  resultState: RecoilValueReadOnly<Person[]>,
}

const PersonModal = (props: Props) => {
  const setModal = useSetRecoilState(modalState);
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
    setModal(ModalEnum.None)
    setSearch("")
    
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

  const buttonClass = (isSelected: boolean): string => {
    if (isSelected) {
      return `${styles.button} ${styles.selected}`;
    }

    return styles.button
  }

  const GenderSelection = () => {
    if (!props.genderState) {
      return null
    }

    const [gender, setGender] = useRecoilState(props.genderState)
    return (
      <div className={styles.genderSelect}>
        <button className={buttonClass(gender == Gender.Female)} onClick={() => setGender(Gender.Female)}>
          Female
        </button>
        <button className={buttonClass(gender == Gender.Male)} onClick={() => setGender(Gender.Male)}>
          Male
        </button>
        <button className={buttonClass(gender == Gender.None)} onClick={() => setGender(Gender.None)}>
          M/F
        </button>
      </div>
    )
  }

  return (
    <Modal name={props.name} remove={removeSelected}>
      <div className={styles.content}>
        <div className={styles.search}>
          <input type="text" value={search} onChange={(event) => setSearch(event.target.value)} />
        </div>
        <GenderSelection />
        <SearchResults />
      </div>
    </Modal>
  )
}

export default PersonModal;