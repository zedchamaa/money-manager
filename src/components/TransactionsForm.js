import { useState, useEffect } from 'react'
import { useFirestore } from '@/hooks/useFirestore'
import { useAuthContext } from '@/hooks/useAuthContext'

// styles
import styles from './TransactionsForm.module.css'

// components
import CategoryMenu from './CategoryMenu'

export default function TransactionsForm({ handleCancel }) {
  const { addDocument } = useFirestore('transactions')
  const { user } = useAuthContext()

  const [date, setDate] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('')
  const [category, setCategory] = useState('')
  const [alert, setAlert] = useState('')

  // category drop down menu
  const handleCategoryChange = (selectedOption) => {
    setCategory(selectedOption.value)
  }

  // handle income selection
  const handleIncomeType = () => {
    setType('income')
  }

  // handle expense selection
  const handleExpenseType = () => {
    setType('expense')
  }

  // handle submit form
  const handleSubmit = (e) => {
    e.preventDefault()

    // form validation
    if (!date) {
      setAlert('Please select a date')
      return
    } else if (!amount) {
      setAlert('Please enter an amount')
      return
    } else if (!type) {
      setAlert('Please select a type')
      return
    } else if (!category) {
      setAlert('Please select a category')
      return
    }

    // add transactions to firebase database
    addDocument({
      date,
      amount: Number(amount),
      type,
      category,
      uid: user.uid,
    })

    // scroll to the top of the page
    window.scrollTo(0, 0)

    // close the modal
    handleCancel()
  }

  return (
    <div className={styles.formContainer}>
      {alert && <div className='form-alert'>{alert}</div>}
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
            <div onClick={handleIncomeType}>Income</div>
            <div onClick={handleExpenseType}>Expense</div>
          </div>
        </label>
        <label>
          <span>Category</span>
          <CategoryMenu onChange={handleCategoryChange} />
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
