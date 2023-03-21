// styles
import styles from './TransactionsHistoryMobile.module.css'

// components
import SearchForm from './SearchForm'
import TransactionsListMobile from './TransactionsListMobile'
import MobileDivider from './icons/MobileDivider'

export default function TransactionsHistoryMobile({
  filteredTransactions,
  handleChangeSearchTerm,
  searchTerm,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Transactions History</div>
      <div className={styles.search}>
        <SearchForm
          onChange={handleChangeSearchTerm}
          searchTerm={searchTerm}
        />
      </div>
      <div className={styles.transactionsList}>
        <MobileDivider />
        <TransactionsListMobile filteredTransactions={filteredTransactions} />
      </div>
    </div>
  )
}
