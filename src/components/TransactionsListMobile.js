import { useState, useEffect } from 'react'

// styles
import styles from './TransactionsListMobile.module.css'

// components
import IncomeIconMobile from './icons/IncomeIconMobile'
import ExpenseIconMobile from './icons/ExpenseIconMobile'
import EditIconMobile from './icons/EditIconMobile'
import TrashIconMobile from './icons/TrashIconMobile'

// libraries
import { formatNumber } from 'accounting'

export default function TransactionsListMobile({ transactionsByYear }) {
  let amountSign = ''
  const [alert, setAlert] = useState(false)

  useEffect(() => {
    if (transactionsByYear?.length === 0) {
      setAlert(true)
    } else setAlert(false)
  }, [transactionsByYear])

  const handleEditTransaction = () => {
    console.log('Edit Transaction')
  }

  const handleDeleteTransaction = () => {
    console.log('Delete Transaction')
  }

  const transactions = transactionsByYear?.map((transaction) => (
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
          <TrashIconMobile onClick={handleDeleteTransaction} />
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
      {alert && <p>There are no transactions currently</p>}
      {!transactions && <p>Loading...</p>}
      {transactions}
    </>
  )
}
