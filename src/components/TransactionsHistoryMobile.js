import { useState } from 'react'

// styles
import styles from './TransactionsHistoryMobile.module.css'

// components
import SearchForm from './SearchForm'
import TransactionsListMobile from './TransactionsListMobile'
import MobileDivider from './icons/MobileDivider'

export default function TransactionsHistoryMobile({ transactionsByYear }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value)
  }

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
        <TransactionsListMobile transactionsByYear={transactionsByYear} />
      </div>
      <div className={styles.pagination}>Pagination Menu</div>
    </div>
  )
}
