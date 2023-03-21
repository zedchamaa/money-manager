import { useState } from 'react'
import { useFirestore } from '@/hooks/useFirestore'
import { useAuthContext } from '@/hooks/useAuthContext'

// styles
import styles from './TransactionsForm.module.css'

// components
import CategoryMenuIncome from './CategoryMenuIncome'
import CategoryMenuExpense from './CategoryMenuExpense'
import IncomeIcon from './icons/IncomeIcon'
import ExpenseIcon from './icons/ExpenseIcon'

// libraries
import dateFormat from 'dateformat'
import { toast } from 'react-toastify'
import moment from 'moment'

export default function TransactionsForm({
  handleCancel,
  title,
  transactionId,
  transactionDate,
  transactionAmount,
  transactionType,
}) {
  const { addDocument, updateDocument } = useFirestore('transactions')
  const { user } = useAuthContext()

  const [date, setDate] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('')
  const [category, setCategory] = useState('')
  const [incomeColor, setIncomeColor] = useState('#667085')
  const [expenseColor, setExpenseColor] = useState('#667085')
  const [incomeSelected, setIncomeSelected] = useState(false)
  const [expenseSelected, setExpenseSelected] = useState(false)
  const [showOriginalDate, setShowOriginalDate] = useState(true)
  const [showOriginalAmount, setShowOriginalAmount] = useState(true)
  const [showOriginalType, setShowOriginalType] = useState(true)
  const [showNewType, setShowNewType] = useState(false)

  // category drop down menu
  const handleCategoryChange = (selectedOption) => {
    setCategory(selectedOption.value)
  }

  // handle income selection
  const handleIncomeType = () => {
    setType('income')
    setIncomeSelected(true)
    setExpenseSelected(false)
    setIncomeColor('#43936C')
    setExpenseColor('#667085')
  }

  // handle expense selection
  const handleExpenseType = () => {
    setType('expense')
    setExpenseSelected(true)
    setIncomeSelected(false)
    setExpenseColor('#CB3A31')
    setIncomeColor('#667085')
  }

  // handle submit form
  const handleSubmit = (e) => {
    e.preventDefault()

    // form validation
    if (!date && !transactionDate) {
      toast.error('Please select a date')
      return
    } else if (!amount && !transactionAmount) {
      toast.error('Please enter an amount')
      return
    } else if (!type && !transactionType) {
      toast.error('Please select a type')
      return
    } else if (!category) {
      toast.error('Please select a category')
      return
    }

    if (title === 'Add Transaction') {
      // add transaction to firebase database
      addDocument({
        date: dateFormat(date, 'dddd, d mmm yyyy'),
        amount: Number(amount),
        type,
        category: category,
        uid: user.uid,
      })
    } else if (title === 'Edit Transaction') {
      // update transaction in firebase database
      updateDocument(transactionId, {
        date: dateFormat(date, 'dddd, d mmm yyyy'),
        amount: Number(amount),
        type,
        category: category,
        uid: user.uid,
      })
    }

    // scroll to the top of the page
    window.scrollTo(0, 0)

    // close the modal
    handleCancel()
  }

  const handleChangeDate = (e) => {
    setShowOriginalDate(false)
    setDate('')
    setDate(e.target.value)
  }

  const handleChangeAmount = (e) => {
    if (title === 'Add Transaction') {
      setAmount(e.target.value)
    }

    if (title === 'Edit Transaction') {
      setShowOriginalAmount(false)
      setAmount('')
      setAmount(e.target.value)
    }
  }

  const handleHideOriginalType = () => {
    setShowOriginalType(false)
    setShowNewType(true)
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Date</span>
          <input
            type='date'
            onChange={(e) => handleChangeDate(e)}
            value={
              showOriginalDate
                ? moment(transactionDate, 'ddd, DD MMM YYYY').format(
                    'YYYY-MM-DD'
                  )
                : date
            }
            placeholder='Select date'
          />
        </label>
        <label>
          <span>Amount</span>
          <input
            type='number'
            onChange={(e) => handleChangeAmount(e)}
            value={showOriginalAmount ? transactionAmount : amount}
            placeholder='Input amount'
          />
        </label>
        <label>
          <span>Transaction type</span>
          {showOriginalType && (
            <div className={styles.transactionType}>
              <div
                className={
                  transactionType === 'income'
                    ? styles.incomeSelected
                    : styles.income
                }
                onClick={handleHideOriginalType}
              >
                <IncomeIcon color={incomeColor} />
                Income
              </div>
              <div
                className={
                  transactionType === 'expense'
                    ? styles.expenseSelected
                    : styles.expense
                }
                onClick={handleHideOriginalType}
              >
                <ExpenseIcon color={expenseColor} />
                Expense
              </div>
            </div>
          )}
          {showNewType && (
            <div className={styles.transactionType}>
              <div
                className={
                  incomeSelected ? styles.incomeSelected : styles.income
                }
                onClick={handleIncomeType}
              >
                <IncomeIcon color={incomeColor} />
                Income
              </div>
              <div
                className={
                  expenseSelected ? styles.expenseSelected : styles.expense
                }
                onClick={handleExpenseType}
              >
                <ExpenseIcon color={expenseColor} />
                Expense
              </div>
            </div>
          )}
        </label>
        <label>
          <span>Category</span>
          {type === 'income' ? (
            <CategoryMenuIncome onChange={handleCategoryChange} />
          ) : (
            <CategoryMenuExpense onChange={handleCategoryChange} />
          )}
        </label>
      </form>
      <div className={styles.bottom}>
        <button
          className={styles.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className={styles.confirmButton}
          onClick={handleSubmit}
        >
          Confirm
        </button>
      </div>
    </div>
  )
}
