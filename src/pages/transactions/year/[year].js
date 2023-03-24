import { useRouter } from 'next/router'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useState } from 'react'
import { useCollection } from '@/hooks/useCollection'

// components
import MobileMenu from '@/components/MobileMenu'
import DesktopMenu from '@/components/DesktopMenu'
import IntroTopMobile from '@/components/IntroTopMobile'
import Modal from '@/components/Modal'
import TransactionsForm from '@/components/TransactionsForm'
import YearsCarouselMobile from '@/components/YearsCarouselMobile'
import YearsCarouselDesktop from '@/components/YearsCarouselDesktop'
import TransactionsSummaryMobile from '@/components/TransactionsSummaryMobile'
import TransactionsSummaryDesktop from '@/components/TransactionsSummaryDesktop'
import TransactionsHistoryMobile from '@/components/TransactionsHistoryMobile'
import TransactionsHistoryDesktop from '@/components/TransactionsHistoryDesktop'
import Footer from '@/components/Footer'

export default function TransactionsYear() {
  let transactionsByYear
  let filteredTransactions
  let totalTransactions = 0
  let totalIncome = 0
  let totalExpenses = 0
  let remainingBalance = 0
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const { user } = useAuthContext()
  const { year } = router.query

  const { documents, error } = useCollection(
    'transactions',
    user,
    user && ['uid', '==', user.uid],
    ['createdAt', 'desc']
  )

  // hide the page content from non-logged in users
  // always run this if statement first
  if (!user) {
    return
  }

  if (documents) {
    // filter the transactions based on the page's year
    transactionsByYear = documents.filter((doc) => doc.date.includes(year))

    // filter the transactions based on user search input
    filteredTransactions = transactionsByYear.filter(
      (transaction) =>
        transaction.amount.toString().includes(searchTerm) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.date.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // find the total quantity of transactions
    totalTransactions = filteredTransactions.length

    // find the total amount of income transactions
    const incomeTransactions = filteredTransactions.filter(
      (transaction) => transaction.type === 'income'
    )

    totalIncome = incomeTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    )

    // find the total amount of expenses transactions
    const expensesTransactions = filteredTransactions.filter(
      (transaction) => transaction.type === 'expense'
    )

    totalExpenses = expensesTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    )

    remainingBalance = totalIncome - totalExpenses
  }

  // handle user search input
  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value)
  }

  // show the modal
  const handleShowModal = () => {
    setShowModal(true)
  }

  // hide the modal
  const handleCancel = () => {
    setShowModal(false)
  }

  return (
    <>
      {showModal && (
        <Modal title='Add Transaction'>
          <TransactionsForm
            handleCancel={handleCancel}
            title='Add Transaction'
          />
        </Modal>
      )}
      <MobileMenu />
      <DesktopMenu onClick={handleShowModal} />
      <IntroTopMobile
        title='Transactions'
        onClick={handleShowModal}
      />
      <YearsCarouselMobile />
      <YearsCarouselDesktop />
      <TransactionsSummaryMobile
        transactions={totalTransactions}
        income={totalIncome}
        expenses={totalExpenses}
        balance={remainingBalance}
      />
      <TransactionsSummaryDesktop
        transactions={totalTransactions}
        income={totalIncome}
        expenses={totalExpenses}
        balance={remainingBalance}
      />
      <TransactionsHistoryMobile
        filteredTransactions={filteredTransactions}
        handleChangeSearchTerm={handleChangeSearchTerm}
      />
      <TransactionsHistoryDesktop
        filteredTransactions={filteredTransactions}
        handleChangeSearchTerm={handleChangeSearchTerm}
      />
      <Footer />
    </>
  )
}
