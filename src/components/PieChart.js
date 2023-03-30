import { useState, useEffect } from 'react'

// styles
import styles from './PieChart.module.css'

// components
import PieChartDividerMobile from './icons/PieChartDividerMobile'
import PieChartDividerDesktop from './icons/PieChartDividerDesktop'

// libraries
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import classNames from 'classnames'
import { formatNumber } from 'accounting'

export default function PieChart({
  title,
  chartData,
  labelOne,
  labelTwo,
  income,
  expenses,
  remaining,
  budget,
}) {
  if (!chartData) {
    return null
  }

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
      <div className={styles.dividerMobile}>
        <PieChartDividerMobile />
      </div>
      <div className={styles.dividerDesktop}>
        <PieChartDividerDesktop />
      </div>
      <div className={styles.chartInfoArea}>
        <div className={styles.chartArea}>
          <div className={styles.chart}>
            <Doughnut data={chartData} />
          </div>
          <div className={styles.labels}>
            <div className={styles.labelOne}>
              <div className={styles.labelOneColor}></div>
              {labelOne}
            </div>
            <div className={styles.labelTwo}>
              <div className={styles.labelTwoColor}></div>
              {labelTwo}
            </div>
          </div>
        </div>
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
    </div>
  )
}
