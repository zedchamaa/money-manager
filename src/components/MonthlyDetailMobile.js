import Image from 'next/image'
import { useState, useEffect } from 'react'

// styles
import styles from './MonthlyDetailMobile.module.css'

// components
import IncomeIconSmall from './icons/IncomeIconSmall'
import ExpensesIconSmall from './icons/ExpensesIconSmall'
import RemainingIconSmall from './icons/RemainingIconSmall'
import BudgetIconSmall from './icons/BudgetIconSmall'
import SmallDivider from './icons/SmallDivider'

// libraries
import { formatNumber } from 'accounting'

export default function MonthlyDetailMobile({
  month,
  income,
  expenses,
  remaining,
  budget,
}) {
  const [status, setStatus] = useState('')
  const [budgetInput, setBudgetInput] = useState('')
  const happyFace = 'happy-face.png'
  const sadFace = 'sad-face.png'
  const neutralFace = 'neutral-face.png'

  useEffect(() => {
    if (budget > expenses) {
      setStatus(happyFace)
    } else if (budget < expenses) {
      setStatus(sadFace)
    } else setStatus(neutralFace)
  }, [budget, expenses])

  const handleChange = (e) => {
    setBudgetInput(e.target.value)
    console.log(e.target.value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.month}>{month}</div>
        <div className={styles.icon}>
          <Image
            src={`/assets/images/${status}`}
            alt='Status'
            width={24}
            height={24}
          />
        </div>
      </div>
      <div className={styles.middle}>
        <div className={styles.row}>
          <div className={styles.type}>
            <IncomeIconSmall />
            <div>Income</div>
          </div>
          <div className={styles.incomeValue}>+${formatNumber(income)}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.type}>
            <ExpensesIconSmall />
            <div>Expenses</div>
          </div>
          <div className={styles.expensesValue}>-${formatNumber(expenses)}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.type}>
            <RemainingIconSmall />
            <div>Remaining</div>
          </div>
          <div className={styles.remainingValue}>
            ${formatNumber(remaining)}
          </div>
        </div>
        <div className={styles.divider}>
          <SmallDivider />
        </div>
        <div className={styles.bottom}>
          <div className={styles.type}>
            <BudgetIconSmall />
            <div>Budget</div>
          </div>
          <div className={styles.budgetInput}>
            <input
              type='number'
              onChange={(e) => handleChange(e)}
              value={budgetInput}
              placeholder={'Enter Budget'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
