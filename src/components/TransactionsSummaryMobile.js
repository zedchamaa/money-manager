// styles
import styles from './TransactionsSummaryMobile.module.css'

// components
import DividerMobile from './icons/DividerMobile'
import TotalIncomeIcon from './icons/TotalIncomeIcon'
import TotalExpensesIcon from './icons/TotalExpensesIcon'
import RemainingBalanceIcon from './icons/RemainingBalanceIcon'

// libraries
import { formatNumber } from 'accounting'

export default function TransactionsSummaryMobile({
  income,
  expenses,
  balance,
  totalTransactions,
  totalIncomeTransactions,
  totalExpensesTransactions,
}) {
  // change balance symbol depending on balance value
  let balanceSymbol

  if (balance === 0) balanceSymbol = ''
  if (balance > 0) balanceSymbol = '+'
  if (balance < 0) balanceSymbol = '-'

  // use 'transaction' singular format where applicable
  let totalTransactionsText
  let totalIncomeTransactionsText
  let totalExpensesTransactionsText

  if (totalTransactions === 1) {
    totalTransactionsText = 'transaction'
  } else {
    totalTransactionsText = 'transactions'
  }

  if (totalIncomeTransactions === 1) {
    totalIncomeTransactionsText = 'transaction'
  } else {
    totalIncomeTransactionsText = 'transactions'
  }

  if (totalExpensesTransactions === 1) {
    totalExpensesTransactionsText = 'transaction'
  } else {
    totalExpensesTransactionsText = 'transactions'
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>Transactions Summary</div>
      <DividerMobile />
      <div className={styles.summary}>
        <TotalIncomeIcon />
        <div className={styles.info}>
          <div className={styles.subtitle}>Total Income</div>
          <div className={styles.income}>
            +${formatNumber(income)}{' '}
            <span>
              in {formatNumber(totalIncomeTransactions)}{' '}
              {totalIncomeTransactionsText}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.summary}>
        <TotalExpensesIcon />
        <div className={styles.info}>
          <div className={styles.subtitle}>Total Expenses</div>
          <div className={styles.expenses}>
            -${formatNumber(expenses)}{' '}
            <span>
              in {formatNumber(totalExpensesTransactions)}{' '}
              {totalExpensesTransactionsText}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.summary}>
        <RemainingBalanceIcon />
        <div className={styles.info}>
          <div className={styles.subtitle}>Remaining Balance</div>
          <div className={styles.balance}>
            {balanceSymbol}${formatNumber(Math.abs(balance))}{' '}
            <span>
              in {formatNumber(totalTransactions)} {totalTransactionsText}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
