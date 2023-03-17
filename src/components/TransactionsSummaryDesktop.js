// styles
import styles from './TransactionsSummaryDesktop.module.css'

// components
import DividerDesktop from './icons/DividerDesktop'
import TotalIncomeIconDesktop from './icons/TotalIncomeIconDesktop'
import TotalExpensesIconDesktop from './icons/TotalExpensesIconDesktop'
import RemainingBalanceIconDesktop from './icons/RemainingBalanceIconDesktop'
import VerticalDivider from './icons/VerticalDivider'

// libraries
import { formatNumber } from 'accounting'

export default function TransactionsSummaryDesktop({
  income,
  expenses,
  balance,
  transactions,
}) {
  // change balance symbol depending on balance value
  let balanceSymbol

  if (balance === 0) balanceSymbol = ''
  if (balance > 0) balanceSymbol = '+'
  if (balance < 0) balanceSymbol = '-'

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Transactions Summary
        <DividerDesktop />
      </div>
      <div className={styles.summaries}>
        <div className={styles.summary}>
          <TotalIncomeIconDesktop />
          <div className={styles.info}>
            <div className={styles.subtitle}>Total Income</div>
            <div className={styles.income}>
              +${formatNumber(income)}
              <div className={styles.transactions}>
                <span>in {formatNumber(transactions)} transactions</span>
              </div>
            </div>
          </div>
        </div>
        <VerticalDivider />
        <div className={styles.summary}>
          <TotalExpensesIconDesktop />
          <div className={styles.info}>
            <div className={styles.subtitle}>Total Expenses</div>
            <div className={styles.expenses}>
              -${formatNumber(expenses)}
              <div className={styles.transactions}>
                <span>in {formatNumber(transactions)} transactions</span>
              </div>
            </div>
          </div>
        </div>
        <VerticalDivider />
        <div className={styles.summary}>
          <RemainingBalanceIconDesktop />
          <div className={styles.info}>
            <div className={styles.subtitle}>Remaining Balance</div>
            <div className={styles.balance}>
              {balanceSymbol}${formatNumber(Math.abs(balance))}
              <div className={styles.transactions}>
                <span>in {formatNumber(transactions)} transactions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
