// styles
import styles from './QuarterAverage.module.css'

// components
import AverageDivider from './icons/AverageDivider'

// libraries
import classNames from 'classnames'
import { formatNumber } from 'accounting'

export default function QuarterAverage({
  title,
  income,
  expenses,
  remaining,
  budget,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <AverageDivider />
      <div className={styles.infoArea}>
        <div className={styles.row}>
          <div className={styles.type}>Income</div>
          <div className={classNames(styles.amount, styles.positive)}>
            ${formatNumber(income)}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.type}>Expenses</div>
          <div className={classNames(styles.amount, styles.negative)}>
            -${formatNumber(expenses)}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.type}>Remaining</div>
          <div className={classNames(styles.amount, styles.neutral)}>
            ${formatNumber(remaining)}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.type}>Budget</div>
          <div className={classNames(styles.amount, styles.neutral)}>
            ${formatNumber(budget)}
          </div>
        </div>
      </div>
    </div>
  )
}
