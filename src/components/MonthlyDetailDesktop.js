import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useFirestore } from '@/hooks/useFirestore'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useCollection } from '@/hooks/useCollection'

// styles
import styles from './MonthlyDetailDesktop.module.css'

// components
import IncomeIconSmall from './icons/IncomeIconSmall'
import ExpensesIconSmall from './icons/ExpensesIconSmall'
import RemainingIconSmall from './icons/RemainingIconSmall'
import BudgetIconSmall from './icons/BudgetIconSmall'
import SmallDivider from './icons/SmallDivider'
import EditIconMobile from './icons/EditIconMobile'

// libraries
import { formatNumber } from 'accounting'

export default function MonthlyDetailDesktop({
  month,
  income,
  expenses,
  remaining,
}) {
  let monthBudget
  let budgetId

  const { addDocument, updateDocument } = useFirestore('budgets')
  const { user } = useAuthContext()

  const router = useRouter()
  const { year } = router.query

  let cardId = month + ' ' + year

  const [status, setStatus] = useState('')
  const [budgetInput, setBudgetInput] = useState('')
  const [editedBudgetInput, setEditedBudgetInput] = useState('')
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

  // update status state
  useEffect(() => {
    if (monthBudget > expenses) {
      setStatus(happyFace)
    } else if (monthBudget < expenses) {
      setStatus(sadFace)
    } else setStatus(neutralFace)
  }, [expenses, monthBudget])

  // display correct month budget after adding new budget
  if (budgets) {
    const monthlyBudgets = budgets.filter(
      (budget) => budget.month === month && budget.year === year
    )

    monthBudget = monthlyBudgets.reduce((acc, budget) => acc + budget.amount, 0)
  }

  // handle add budget
  const handleAddBudget = (e) => {
    e.preventDefault()

    if (budgetInput === '' || budgetInput === 0) {
      return
    }

    // add budget to firebase database
    addDocument({
      amount: budgetInput,
      year: year,
      month: month,
      added: true,
      cardId: cardId,
      uid: user.uid,
    })

    if (budgetInput > expenses) {
      setStatus(happyFace)
    } else if (budgetInput < expenses) {
      setStatus(sadFace)
    } else setStatus(neutralFace)
  }

  // handle show edit button
  const handleShowEdit = () => {
    setShowEditButton(false)
    setShowEditBudget(true)
  }

  // handle edit budget
  const handleEditBudget = (e) => {
    e.preventDefault()

    if (budgets) {
      const monthlyBudgets = budgets.filter(
        (budget) => budget.month === month && budget.year === year
      )

      budgetId = monthlyBudgets.map((budget) => budget.id)

      budgetId = budgetId[0]
    }

    if (editedBudgetInput !== '' && editedBudgetInput !== 0) {
      // edit budget in firebase database
      updateDocument(budgetId, {
        amount: editedBudgetInput,
        year: year,
        month: month,
        uid: user.uid,
      })
    }

    if (editedBudgetInput > expenses) {
      setStatus(happyFace)
    } else if (editedBudgetInput < expenses) {
      setStatus(sadFace)
    } else setStatus(neutralFace)

    setShowEditBudget(false)
    setShowEditButton(true)
  }

  // set the monthly budgets
  function setMonthBudget(
    monthName,
    budgets,
    year,
    monthBudget,
    setShowAddBudget,
    setShowEditButton
  ) {
    const monthNameBudget = budgets.find(
      (budget) =>
        budget.month === monthName &&
        budget.year === year &&
        budget.added === true &&
        budget.cardId === cardId
    )
    if (monthNameBudget) {
      setShowAddBudget(false)
      setShowEditButton(true)
    } else if (monthBudget === 0 && month === monthName) {
      setShowAddBudget(true)
      setShowEditButton(false)
    }

    // update status state
    if (monthBudget > expenses) {
      setStatus(happyFace)
    } else if (monthBudget < expenses) {
      setStatus(sadFace)
    } else setStatus(neutralFace)
  }

  // set January budgets
  useEffect(() => {
    if (budgets && budgets.length > 0) {
      setMonthBudget(
        'January',
        budgets,
        year,
        monthBudget,
        setShowAddBudget,
        setShowEditButton
      )
    }
  }, [budgets, year])

  // set February budgets
  useEffect(() => {
    if (budgets && budgets.length > 0) {
      setMonthBudget(
        'February',
        budgets,
        year,
        monthBudget,
        setShowAddBudget,
        setShowEditButton
      )
    }
  }, [budgets, year])

  // set March budgets
  useEffect(() => {
    if (budgets && budgets.length > 0) {
      setMonthBudget(
        'March',
        budgets,
        year,
        monthBudget,
        setShowAddBudget,
        setShowEditButton
      )
    }
  }, [budgets, year])

  // set April budgets
  useEffect(() => {
    if (budgets && budgets.length > 0) {
      setMonthBudget(
        'April',
        budgets,
        year,
        monthBudget,
        setShowAddBudget,
        setShowEditButton
      )
    }
  }, [budgets, year])

  // set May budgets
  useEffect(() => {
    if (budgets && budgets.length > 0) {
      setMonthBudget(
        'May',
        budgets,
        year,
        monthBudget,
        setShowAddBudget,
        setShowEditButton
      )
    }
  }, [budgets, year])

  // set June budgets
  useEffect(() => {
    if (budgets && budgets.length > 0) {
      setMonthBudget(
        'June',
        budgets,
        year,
        monthBudget,
        setShowAddBudget,
        setShowEditButton
      )
    }
  }, [budgets, year])

  // set July budgets
  useEffect(() => {
    if (budgets && budgets.length > 0) {
      setMonthBudget(
        'July',
        budgets,
        year,
        monthBudget,
        setShowAddBudget,
        setShowEditButton
      )
    }
  }, [budgets, year])

  // set August budgets
  useEffect(() => {
    if (budgets && budgets.length > 0) {
      setMonthBudget(
        'August',
        budgets,
        year,
        monthBudget,
        setShowAddBudget,
        setShowEditButton
      )
    }
  }, [budgets, year])

  // set September budgets
  useEffect(() => {
    if (budgets && budgets.length > 0) {
      setMonthBudget(
        'September',
        budgets,
        year,
        monthBudget,
        setShowAddBudget,
        setShowEditButton
      )
    }
  }, [budgets, year])

  // set October budgets
  useEffect(() => {
    if (budgets && budgets.length > 0) {
      setMonthBudget(
        'October',
        budgets,
        year,
        monthBudget,
        setShowAddBudget,
        setShowEditButton
      )
    }
  }, [budgets, year])

  // set November budgets
  useEffect(() => {
    if (budgets && budgets.length > 0) {
      setMonthBudget(
        'November',
        budgets,
        year,
        monthBudget,
        setShowAddBudget,
        setShowEditButton
      )
    }
  }, [budgets, year])

  // set December budgets
  useEffect(() => {
    if (budgets && budgets.length > 0) {
      setMonthBudget(
        'December',
        budgets,
        year,
        monthBudget,
        setShowAddBudget,
        setShowEditButton
      )
    }
  }, [budgets, year])

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.month}>{cardId}</div>
        <div className={styles.icon}>
          <Image
            src={`/assets/images/${status}`}
            alt='Status'
            width={24}
            height={24}
            unoptimized
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
                    placeholder={'Enter Budget'}
                  />
                </form>
                <div className={styles.button}>
                  <button onClick={handleAddBudget}>Add</button>
                </div>
              </>
            )}
            {showEditButton && (
              <div className={styles.budgetInfo}>
                <EditIconMobile onClick={handleShowEdit} />
                <div className={styles.budget}>
                  ${formatNumber(monthBudget)}
                </div>
              </div>
            )}
            {showEditBudget && (
              <>
                <form onSubmit={handleEditBudget}>
                  <input
                    type='number'
                    onChange={(e) =>
                      setEditedBudgetInput(Number(e.target.value))
                    }
                    placeholder={'Edit Budget'}
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
