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
  let monthBudget

  const { addDocument, updateDocument } = useFirestore('budgets')
  const { user } = useAuthContext()

  const router = useRouter()
  const { year } = router.query

  const [status, setStatus] = useState('')
  const [budgetInput, setBudgetInput] = useState('')
  const [showAddBudget, setShowAddBudget] = useState(true)
  const [showEditButton, setShowEditButton] = useState(false)
  const [showEditBudget, setShowEditBudget] = useState(false)

  const happyFace = 'happy-face.png'
  const sadFace = 'sad-face.png'
  const neutralFace = 'neutral-face.png'

  const { documents: budgets } = useCollection(
    'budgets',
    user,
    user && ['uid', '==', user.uid],
    ['createdAt', 'desc']
  )

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

  // display correct month budget after adding new budget
  if (budgets) {
    const monthlyBudgets = budgets.filter(
      (budget) => budget.month === month && budget.year === year
    )

    monthBudget = monthlyBudgets.reduce((acc, budget) => acc + budget.amount, 0)
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

  // set January budgets
  useEffect(() => {
    if (budgets && budgets.length > 0) {
      const janBudget = budgets.find(
        (budget) =>
          budget.month === 'January' &&
          budget.year === year &&
          budget.added === true
      )
      if (janBudget) {
        setShowAddBudget(false)
        setShowEditButton(true)
      } else if (monthBudget === 0 && month === 'January') {
        setShowAddBudget(true)
        setShowEditButton(false)
      }
    }
  }, [budgets, year])

  // set February budgets
  useEffect(() => {
    if (budgets && budgets.length > 0) {
      const febBudget = budgets.find(
        (budget) =>
          budget.month === 'February' &&
          budget.year === year &&
          budget.added === true
      )
      if (febBudget) {
        setShowAddBudget(false)
        setShowEditButton(true)
      } else if (monthBudget === 0 && month === 'February') {
        setShowAddBudget(true)
        setShowEditButton(false)
      }
    }
  }, [budgets, year])

  // set March budgets
  useEffect(() => {
    if (budgets && budgets.length > 0) {
      const marBudget = budgets.find(
        (budget) =>
          budget.month === 'March' &&
          budget.year === year &&
          budget.added === true
      )
      if (marBudget) {
        setShowAddBudget(false)
        setShowEditButton(true)
      } else if (monthBudget === 0 && month === 'March') {
        setShowAddBudget(true)
        setShowEditButton(false)
      }
    }
  }, [budgets, year])

  // set Apr budgets
  useEffect(() => {
    if (budgets && budgets.length > 0) {
      const aprBudget = budgets.find(
        (budget) =>
          budget.month === 'April' &&
          budget.year === year &&
          budget.added === true
      )
      if (aprBudget) {
        setShowAddBudget(false)
        setShowEditButton(true)
      } else if (monthBudget === 0 && month === 'April') {
        setShowAddBudget(true)
        setShowEditButton(false)
      }
    }
  }, [budgets, year])

  // set May budgets
  useEffect(() => {
    if (budgets && budgets.length > 0) {
      const mayBudget = budgets.find(
        (budget) =>
          budget.month === 'May' &&
          budget.year === year &&
          budget.added === true
      )
      if (mayBudget) {
        setShowAddBudget(false)
        setShowEditButton(true)
      } else if (monthBudget === 0 && month === 'May') {
        setShowAddBudget(true)
        setShowEditButton(false)
      }
    }
  }, [budgets, year])

  // set Jun budgets
  useEffect(() => {
    if (budgets && budgets.length > 0) {
      const junBudget = budgets.find(
        (budget) =>
          budget.month === 'June' &&
          budget.year === year &&
          budget.added === true
      )
      if (junBudget) {
        setShowAddBudget(false)
        setShowEditButton(true)
      } else if (monthBudget === 0 && month === 'June') {
        setShowAddBudget(true)
        setShowEditButton(false)
      }
    }
  }, [budgets, year])

  // set Jul budgets
  useEffect(() => {
    if (budgets && budgets.length > 0) {
      const julBudget = budgets.find(
        (budget) =>
          budget.month === 'July' &&
          budget.year === year &&
          budget.added === true
      )
      if (julBudget) {
        setShowAddBudget(false)
        setShowEditButton(true)
      } else if (monthBudget === 0 && month === 'July') {
        setShowAddBudget(true)
        setShowEditButton(false)
      }
    }
  }, [budgets, year])

  // set Aug budgets
  useEffect(() => {
    if (budgets && budgets.length > 0) {
      const augBudget = budgets.find(
        (budget) =>
          budget.month === 'August' &&
          budget.year === year &&
          budget.added === true
      )
      if (augBudget) {
        setShowAddBudget(false)
        setShowEditButton(true)
      } else if (monthBudget === 0 && month === 'August') {
        setShowAddBudget(true)
        setShowEditButton(false)
      }
    }
  }, [budgets, year])

  // set Sep budgets
  useEffect(() => {
    if (budgets && budgets.length > 0) {
      const sepBudget = budgets.find(
        (budget) =>
          budget.month === 'September' &&
          budget.year === year &&
          budget.added === true
      )
      if (sepBudget) {
        setShowAddBudget(false)
        setShowEditButton(true)
      } else if (monthBudget === 0 && month === 'September') {
        setShowAddBudget(true)
        setShowEditButton(false)
      }
    }
  }, [budgets, year])

  // set Oct budgets
  useEffect(() => {
    if (budgets && budgets.length > 0) {
      const octBudget = budgets.find(
        (budget) =>
          budget.month === 'October' &&
          budget.year === year &&
          budget.added === true
      )
      if (octBudget) {
        setShowAddBudget(false)
        setShowEditButton(true)
      } else if (monthBudget === 0 && month === 'October') {
        setShowAddBudget(true)
        setShowEditButton(false)
      }
    }
  }, [budgets, year])

  // set Nov budgets
  useEffect(() => {
    if (budgets && budgets.length > 0) {
      const novBudget = budgets.find(
        (budget) =>
          budget.month === 'November' &&
          budget.year === year &&
          budget.added === true
      )
      if (novBudget) {
        setShowAddBudget(false)
        setShowEditButton(true)
      } else if (monthBudget === 0 && month === 'November') {
        setShowAddBudget(true)
        setShowEditButton(false)
      }
    }
  }, [budgets, year])

  // set Dec budgets
  useEffect(() => {
    if (budgets && budgets.length > 0) {
      const decBudget = budgets.find(
        (budget) =>
          budget.month === 'December' &&
          budget.year === year &&
          budget.added === true
      )
      if (decBudget) {
        setShowAddBudget(false)
        setShowEditButton(true)
      } else if (monthBudget === 0 && month === 'December') {
        setShowAddBudget(true)
        setShowEditButton(false)
      }
    }
  }, [budgets, year])

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.month}>
          {month} {year}
        </div>
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
