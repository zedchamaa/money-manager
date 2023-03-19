import { useState, useEffect } from 'react'

// styles
import styles from './TransactionsListMobile.module.css'

export default function TransactionsListMobile({ transactionsByYear }) {
  const [alert, setAlert] = useState(false)

  useEffect(() => {
    if (transactionsByYear?.length === 0) {
      setAlert(true)
    }
  }, [])

  const transactions = transactionsByYear?.map((transaction) => (
    <div key={transaction.id}>{transaction.amount}</div>
  ))

  return (
    <>
      {alert && <p>There are no transactions currently</p>}
      {!transactions && <p>Loading...</p>}
      {transactions}
    </>
  )
}
