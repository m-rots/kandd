import styles from './individual.module.css';

type Props = {
  onClick: () => void,
  name: string
  selected?: boolean,
}

const Individual = ({ selected, name, onClick }: Props) => {
  let className = styles.person;
  if (selected) {
    className += ` ${styles.selected}`;
  }

  return (
    <button className={className} onClick={onClick}>
      {name}
    </button>
  )
}

export default Individual;