// styles
import styles from './BarChart.module.css'

// libraries
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

export default function BarChart({ title, chartData, labelOne, labelTwo }) {
  if (!chartData) {
    return null
  }

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
  }

  return (
    <div className={styles.container}>
      <div className={styles.chartInfo}>
        <div className={styles.title}>{title}</div>
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
      <div className={styles.chart}>
        <Bar
          data={chartData}
          options={options}
        />
      </div>
    </div>
  )
}
