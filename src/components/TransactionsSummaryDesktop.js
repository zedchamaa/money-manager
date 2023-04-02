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
                <span>
                  in {formatNumber(totalIncomeTransactions)}{' '}
                  {totalIncomeTransactionsText}
                </span>
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
                <span>
                  in {formatNumber(totalExpensesTransactions)}{' '}
                  {totalExpensesTransactionsText}
                </span>
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
                <span>
                  in {formatNumber(totalTransactions)} {totalTransactionsText}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
