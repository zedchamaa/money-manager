// styles
import styles from './SearchForm.module.css'

// components
import SearchIcon from './icons/SearchIcon'

export default function SearchForm({ onChange, searchTerm }) {
  return (
    <div className={styles.container}>
      <SearchIcon />
      <input
        type='text'
        placeholder='Search transactions'
        onChange={onChange}
        value={searchTerm}
      />
    </div>
  )
}
