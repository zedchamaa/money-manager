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
  transactions,
}) {
  // change balance symbol depending on balance value
  let balanceSymbol
  balance > 0 ? (balanceSymbol = '+') : (balanceSymbol = '-')

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
            <span>in {formatNumber(transactions)} transactions</span>
          </div>
        </div>
      </div>
      <div className={styles.summary}>
        <TotalExpensesIcon />
        <div className={styles.info}>
          <div className={styles.subtitle}>Total Expenses</div>
          <div className={styles.expenses}>
            -${formatNumber(expenses)}{' '}
            <span>in {formatNumber(transactions)} transactions</span>
          </div>
        </div>
      </div>
      <div className={styles.summary}>
        <RemainingBalanceIcon />
        <div className={styles.info}>
          <div className={styles.subtitle}>Remaining Balance</div>
          <div className={styles.balance}>
            {balanceSymbol}${formatNumber(Math.abs(balance))}{' '}
            <span>in {formatNumber(transactions)} transactions</span>
          </div>
        </div>
      </div>
    </div>
  )
}
