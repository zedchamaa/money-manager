// styles
import styles from './TransactionsHistoryDesktop.module.css'

// components
import SearchForm from './SearchForm'
import TransactionsListDesktop from './TransactionsListDesktop'

export default function TransactionsHistoryDesktop({
  filteredTransactions,
  handleChangeSearchTerm,
  searchTerm,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <div className={styles.title}>Transactions History</div>
        <div className={styles.search}>
          <SearchForm
            onChange={handleChangeSearchTerm}
            searchTerm={searchTerm}
          />
        </div>
      </div>
      <div className={styles.transactionsList}>
        <TransactionsListDesktop filteredTransactions={filteredTransactions} />
      </div>
    </div>
  )
}
