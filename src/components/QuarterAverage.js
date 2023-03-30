import { useState, useEffect } from 'react'

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
  const [showNegativeSymbol, setShowNegativeSymbol] = useState(false)
  const [showNoSymbol, setShowNoSymbol] = useState(false)

  useEffect(() => {
    if (remaining < 0) {
      setShowNegativeSymbol(true)
      setShowNoSymbol(false)
    } else {
      setShowNegativeSymbol(false)
      setShowNoSymbol(true)
    }
  }, [remaining])

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
        {showNoSymbol && (
          <div className={styles.row}>
            <div className={styles.type}>Remaining</div>
            <div className={classNames(styles.amount, styles.neutral)}>
              ${formatNumber(remaining)}
            </div>
          </div>
        )}
        {showNegativeSymbol && (
          <div className={styles.row}>
            <div className={styles.type}>Remaining</div>
            <div className={classNames(styles.amount, styles.neutral)}>
              -${formatNumber(Math.abs(remaining))}
            </div>
          </div>
        )}
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
