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

export default function TransactionsForm({ handleCancel }) {
  const { addDocument } = useFirestore('transactions')
  const { user } = useAuthContext()

  const [date, setDate] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('')
  const [category, setCategory] = useState('')
  const [incomeColor, setIncomeColor] = useState('#667085')
  const [expenseColor, setExpenseColor] = useState('#667085')
  const [incomeSelected, setIncomeSelected] = useState(false)
  const [expenseSelected, setExpenseSelected] = useState(false)

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
    if (!date) {
      toast.error('Please select a date')
      return
    } else if (!amount) {
      toast.error('Please enter an amount')
      return
    } else if (!type) {
      toast.error('Please select a type')
      return
    } else if (!category) {
      toast.error('Please select a category')
      return
    }

    // add transactions to firebase database
    addDocument({
      date: dateFormat(date, 'dddd, d mmm yyyy'),
      amount: Number(amount),
      type,
      category: category,
      uid: user.uid,
    })

    // scroll to the top of the page
    window.scrollTo(0, 0)

    // close the modal
    handleCancel()
  }

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
              className={incomeSelected ? styles.incomeSelected : styles.income}
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
