// styles
import styles from './TransactionsListMobile.module.css'

export default function TransactionsListMobile({ transactionsByYear }) {
  console.log(transactionsByYear)

  const transactions = transactionsByYear?.map((transaction) => (
    <div key={transaction.id}>{transaction.amount}</div>
  ))

  return transactions
}
