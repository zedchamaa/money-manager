import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useFirestore } from '@/hooks/useFirestore'

// styles
import styles from './TransactionsListMobile.module.css'

// components
import IncomeIconMobile from './icons/IncomeIconMobile'
import ExpenseIconMobile from './icons/ExpenseIconMobile'
import EditIconMobile from './icons/EditIconMobile'
import TrashIconMobile from './icons/TrashIconMobile'

// libraries
import { formatNumber } from 'accounting'

export default function TransactionsListMobile({ filteredTransactions }) {
  let amountSign = ''
  const [alert, setAlert] = useState(false)
  const { deleteDocument } = useFirestore('transactions')
  const router = useRouter()
  const { year } = router.query

  useEffect(() => {
    if (filteredTransactions?.length === 0) {
      setAlert(true)
    } else setAlert(false)
  }, [filteredTransactions])

  const handleEditTransaction = () => {
    console.log('Edit Transaction')
  }

  const handleDeleteTransaction = (transaction) => {
    deleteDocument(transaction.id)
  }

  const transactions = filteredTransactions?.map((transaction) => (
    <div
      className={styles.container}
      key={transaction.id}
    >
      <div className={styles.boxOne}>
        <div>
          {transaction.type === 'income' ? (
            <IncomeIconMobile />
          ) : (
            <ExpenseIconMobile />
          )}
        </div>
        <div className={styles.info}>
          <div className={styles.category}>{transaction.category}</div>
          <div className={styles.date}>{transaction.date}</div>
        </div>
      </div>
      <div className={styles.boxTwo}>
        <div className={styles.icons}>
          <EditIconMobile onClick={handleEditTransaction} />
          <TrashIconMobile
            onClick={() => handleDeleteTransaction(transaction)}
          />
        </div>
        <div
          className={
            transaction.type === 'income'
              ? styles.incomeAmount
              : styles.expenseAmount
          }
        >
          {transaction.type === 'income'
            ? (amountSign = '+')
            : (amountSign = '-')}
          ${formatNumber(transaction.amount)}
        </div>
      </div>
    </div>
  ))

  return (
    <>
      {alert && (
        <p>
          There are no transactions currently for <strong>Year {year}</strong>
        </p>
      )}
      {!transactions && <p>Loading...</p>}
      {transactions}
    </>
  )
}
