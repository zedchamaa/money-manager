import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useFirestore } from '@/hooks/useFirestore'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useCollection } from '@/hooks/useCollection'

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
}) {
  const { addDocument, updateDocument } = useFirestore('budgets')
  const { user } = useAuthContext()

  const router = useRouter()
  const { year } = router.query

  const [status, setStatus] = useState('')
  const [budgetInput, setBudgetInput] = useState('')
  const [showAddBudget, setShowAddBudget] = useState(true)
  const [showEditButton, setShowEditButton] = useState(false)
  const [showEditBudget, setShowEditBudget] = useState(false)

  const [monthBudget, setMonthBudget] = useState(0)
  const [janBudget2023, setJanBudget2023] = useState(0)
  const [febBudget2023, setFebBudget2023] = useState(0)
  const [marBudget2023, setMarBudget2023] = useState(0)

  const happyFace = 'happy-face.png'
  const sadFace = 'sad-face.png'
  const neutralFace = 'neutral-face.png'

  const { documents: budgets } = useCollection(
    'budgets',
    user,
    user && ['uid', '==', user.uid],
    ['createdAt', 'desc']
  )

  // set month budget
  useEffect(() => {
    if (month === 'January' && year === '2023') {
      setMonthBudget(janBudget2023)
    } else if (month === 'February' && year === '2023') {
      setMonthBudget(febBudget2023)
    } else if (month === 'March' && year === '2023') {
      setMonthBudget(marBudget2023)
    }
  }, [year])

  useEffect(() => {
    if (monthBudget > expenses) {
      setStatus(happyFace)
    } else if (monthBudget < expenses) {
      setStatus(sadFace)
    } else setStatus(neutralFace)
  }, [monthBudget, expenses])

  // handle add budget
  const handleAddBudget = (e) => {
    e.preventDefault()

    // add budget to firebase database
    addDocument({
      amount: budgetInput,
      year: year,
      month: month,
      added: true,
      uid: user.uid,
    })

    setShowAddBudget(false)
    setShowEditButton(true)
  }

  // handle show edit button
  const handleShowEdit = () => {
    setShowEditButton(false)
    setShowEditBudget(true)
  }

  // handle edit budget
  const handleEditBudget = (e) => {
    e.preventDefault()

    // edit budget in firebase database
    updateDocument({
      amount: budgetInput,
      year: year,
      month: month,
      uid: user.uid,
    })

    setShowEditBudget(false)
    setShowEditButton(true)
  }

  useEffect(() => {
    if (budgets && budgets.length > 0) {
      const monthBudgetDoc = budgets.find(
        (budget) =>
          budget.month === month &&
          budget.year === year &&
          budget.added === true
      )
      if (monthBudgetDoc) {
        setShowAddBudget(false)
        setShowEditButton(true)
      } else {
        setShowAddBudget(true)
        setShowEditButton(false)
      }
    }
  }, [year])

  // set January 2023 budget
  useEffect(() => {
    if (budgets && budgets.length > 0) {
      const janBudgetDoc = budgets.find(
        (budget) =>
          budget.month === 'January' &&
          budget.year === year &&
          budget.added === true
      )
      if (janBudgetDoc) {
        setJanBudget2023(janBudgetDoc.amount)
        setShowAddBudget(false)
        setShowEditButton(true)
      } else if (monthBudget === 0 && month === 'January') {
        setShowAddBudget(true)
        setShowEditButton(false)
      }
    }
  }, [budgets, year])

  // set February 2023 budget
  useEffect(() => {
    if (budgets && budgets.length > 0) {
      const febBudgetDoc = budgets.find(
        (budget) =>
          budget.month === 'February' &&
          budget.year === year &&
          budget.added === true
      )
      if (febBudgetDoc) {
        setFebBudget2023(febBudgetDoc.amount)
        setShowAddBudget(false)
        setShowEditButton(true)
      } else if (monthBudget === 0 && month === 'February') {
        setShowAddBudget(true)
        setShowEditButton(false)
      }
    }
  }, [budgets, year])

  // set March 2023 budget
  useEffect(() => {
    if (budgets && budgets.length > 0) {
      const marBudgetDoc = budgets.find(
        (budget) =>
          budget.month === 'March' &&
          budget.year === year &&
          budget.added === true
      )
      if (marBudgetDoc) {
        setMarBudget2023(marBudgetDoc.amount)
        setShowAddBudget(false)
        setShowEditButton(true)
      } else if (monthBudget === 0 && month === 'March') {
        setShowAddBudget(true)
        setShowEditButton(false)
      }
    }
  }, [budgets, year])

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
            {showAddBudget && (
              <>
                <form onSubmit={handleAddBudget}>
                  <input
                    type='number'
                    onChange={(e) => setBudgetInput(Number(e.target.value))}
                    value={budgetInput}
                    placeholder={'Enter Budget'}
                  />
                </form>
                <div className={styles.button}>
                  <button onClick={handleAddBudget}>Add</button>
                </div>
              </>
            )}
            {showEditButton && (
              <>
                <div>{monthBudget}</div>
                <div className={styles.button}>
                  <button onClick={handleShowEdit}>Edit</button>
                </div>
              </>
            )}
            {showEditBudget && (
              <>
                <form onSubmit={handleEditBudget}>
                  <input
                    type='number'
                    onChange={(e) => setBudgetInput(Number(e.target.value))}
                    value={monthBudget}
                  />
                </form>
                <div className={styles.button}>
                  <button onClick={handleEditBudget}>Save</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
