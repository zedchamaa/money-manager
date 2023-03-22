import { useState, useEffect } from 'react'
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
import moment from 'moment'
import { toast } from 'react-toastify'

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
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

  const transactionDateFormatted = moment(
    transactionDate,
    'ddd, DD MMM YYYY'
  ).format('YYYY-MM-DD')

  const [editedDate, setEditedDate] = useState(transactionDateFormatted)
  const [editedAmount, setEditedAmount] = useState(transactionAmount)
  const [editedType, setEditedType] = useState(transactionType)

  // conditionally show the add and edit forms
  useEffect(() => {
    if (title === 'Add Transaction') {
      setShowAddForm(true)
    } else if (title === 'Edit Transaction') {
      setShowEditForm(true)
    }
  }, [title])

  // category drop down menu
  const handleCategoryChange = (selectedOption) => {
    setCategory(selectedOption.value)
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
        date: dateFormat(editedDate, 'dddd, d mmm yyyy'),
        amount: Number(editedAmount),
        type: editedType,
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
    const selectedDate = e.target.value
    setDate(selectedDate)
    setEditedDate(selectedDate)
  }

  const handleChangeAmount = (e) => {
    if (title === 'Add Transaction') {
      setAmount(e.target.value)
    }

    if (title === 'Edit Transaction') {
      const selectedAmount = e.target.value
      setAmount(selectedAmount)
      setEditedAmount(selectedAmount)
    }
  }

  // handle income selection
  const handleIncomeType = () => {
    if (editedType === 'expense') {
      setEditedType('income')
    }
    setIncomeColor('#43936C')
    setExpenseColor('#667085')
  }

  // handle expense selection
  const handleExpenseType = () => {
    if (editedType === 'income') {
      setEditedType('expense')
    }
    setExpenseColor('#CB3A31')
    setIncomeColor('#667085')
  }

  console.log(editedType)

  // the add transaction form
  const addTransaction = () => {
    return (
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Date</span>
            <input
              type='date'
              onChange={(e) => setDate(e.target.value)}
              value={date}
              placeholder='Select date'
            />
          </label>
          <label>
            <span>Amount</span>
            <input
              type='number'
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              placeholder='Input amount'
            />
          </label>
          <label>
            <span>Transaction type</span>
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

  // the edit transaction form
  const editTransaction = () => {
    return (
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Date</span>
            <input
              type='date'
              onChange={(e) => handleChangeDate(e)}
              value={editedDate}
              placeholder='Select date'
            />
          </label>
          <label>
            <span>Amount</span>
            <input
              type='number'
              onChange={(e) => handleChangeAmount(e)}
              value={editedAmount}
              placeholder='Input amount'
            />
          </label>
          <label>
            <span>Transaction type</span>
            <div className={styles.transactionType}>
              <div
                className={
                  editedType === 'income'
                    ? styles.incomeSelected
                    : styles.income
                }
                onClick={handleIncomeType}
              >
                <IncomeIcon color={incomeColor} />
                Income
              </div>
              <div
                className={
                  editedType === 'expense'
                    ? styles.expenseSelected
                    : styles.expense
                }
                onClick={handleExpenseType}
              >
                <ExpenseIcon color={expenseColor} />
                Expense
              </div>
            </div>
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

  return (
    <>
      {showAddForm && addTransaction()}
      {showEditForm && editTransaction()}
    </>
  )
}
