import { useRouter } from 'next/router'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useState } from 'react'
import { useCollection } from '@/hooks/useCollection'

// styles
import styles from './summary.module.css'

// components
import MobileMenu from '@/components/MobileMenu'
import DesktopMenu from '@/components/DesktopMenu'
import IntroTopMobile from '@/components/IntroTopMobile'
import Modal from '@/components/Modal'
import TransactionsForm from '@/components/TransactionsForm'
import YearsCarouselMobile from '@/components/YearsCarouselMobile'
import YearsCarouselDesktop from '@/components/YearsCarouselDesktop'
import PieChart from '@/components/PieChart'
import BarChart from '@/components/BarChart'
import QuarterAverage from '@/components/QuarterAverage'
import MonthlyDetailMobileDivider from '@/components/icons/MonthlyDetailMobileDivider'
import MonthlyDetailMobile from '@/components/MonthlyDetailMobile'

export default function TransactionsSummary() {
  let transactionsByYear
  let totalIncome
  let totalExpenses
  let totalMonthlyAvgIncome
  let totalMonthlyAvgExpenses
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const { year } = router.query
  const { user } = useAuthContext()

  const { documents } = useCollection(
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

    // find the total amount of income transactions
    const incomeTransactions = transactionsByYear.filter(
      (transaction) => transaction.type === 'income'
    )

    totalIncome = incomeTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    )

    totalMonthlyAvgIncome = Math.round(totalIncome / 12)

    // find the total amount of expenses transactions
    const expensesTransactions = transactionsByYear.filter(
      (transaction) => transaction.type === 'expense'
    )

    totalExpenses = expensesTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    )

    totalMonthlyAvgExpenses = Math.round(totalExpenses / 12)
  }

  // pie chart data for current year
  const currentYearData = {
    datasets: [
      {
        data: [totalIncome, totalExpenses],
        backgroundColor: ['#7F56D9', '#E9D7FE'],
        hoverOffset: 4,
      },
    ],
  }

  // pie chart data for current year monthly average
  const currentYearMonthlyAvgData = {
    datasets: [
      {
        data: [totalMonthlyAvgIncome, totalMonthlyAvgExpenses],
        backgroundColor: ['#7F56D9', '#E9D7FE'],
        hoverOffset: 4,
      },
    ],
  }

  // show the modal
  const handleShowModal = () => {
    setShowModal(true)
  }

  // hide the modal
  const handleCancel = () => {
    setShowModal(false)
  }

  // find the total income of a given month
  function getMonthlyIncome(documents, month) {
    if (documents && transactionsByYear) {
      return transactionsByYear
        .filter(
          (transaction) =>
            transaction.type === 'income' && transaction.date.includes(month)
        )
        .reduce((acc, transaction) => acc + transaction.amount, 0)
    }
  }

  // find the total expense of a given month
  function getMonthlyExpense(documents, month) {
    if (documents && transactionsByYear) {
      return transactionsByYear
        .filter(
          (transaction) =>
            transaction.type === 'expense' && transaction.date.includes(month)
        )
        .reduce((acc, transaction) => acc + transaction.amount, 0)
    }
  }

  // calculate the average income of a given quarter
  function getAvgQuarterIncome(
    incomeMonthOne,
    incomeMonthTwo,
    incomeMonthThree
  ) {
    return (
      parseInt(incomeMonthOne + incomeMonthTwo + incomeMonthThree) / 3
    ).toFixed(2)
  }

  // calculate the average expenses of a given quarter
  function getAvgQuarterExpenses(
    expensesMonthOne,
    expensesMonthTwo,
    expensesMonthThree
  ) {
    return (
      parseInt(expensesMonthOne + expensesMonthTwo + expensesMonthThree) / 3
    ).toFixed(2)
  }

  // calculate the quarterly average remaining value
  function getAvgQuarterRemaining(income, expenses) {
    return income - expenses
  }

  // find the income of each month
  const janIncome = getMonthlyIncome(documents, 'Jan')
  const febIncome = getMonthlyIncome(documents, 'Feb')
  const marIncome = getMonthlyIncome(documents, 'Mar')
  const aprIncome = getMonthlyIncome(documents, 'Apr')
  const mayIncome = getMonthlyIncome(documents, 'May')
  const junIncome = getMonthlyIncome(documents, 'Jun')
  const julIncome = getMonthlyIncome(documents, 'Jul')
  const augIncome = getMonthlyIncome(documents, 'Aug')
  const sepIncome = getMonthlyIncome(documents, 'Sep')
  const octIncome = getMonthlyIncome(documents, 'Oct')
  const novIncome = getMonthlyIncome(documents, 'Nov')
  const decIncome = getMonthlyIncome(documents, 'Dec')

  // find the expenses of each month
  const janExpenses = getMonthlyExpense(documents, 'Jan')
  const febExpenses = getMonthlyExpense(documents, 'Feb')
  const marExpenses = getMonthlyExpense(documents, 'Mar')
  const aprExpenses = getMonthlyExpense(documents, 'Aor')
  const mayExpenses = getMonthlyExpense(documents, 'May')
  const junExpenses = getMonthlyExpense(documents, 'Jun')
  const julExpenses = getMonthlyExpense(documents, 'Jul')
  const augExpenses = getMonthlyExpense(documents, 'Aug')
  const sepExpenses = getMonthlyExpense(documents, 'Sep')
  const octExpenses = getMonthlyExpense(documents, 'Oct')
  const novExpenses = getMonthlyExpense(documents, 'Nov')
  const decExpenses = getMonthlyExpense(documents, 'Dec')

  // calculate the income quarterly averages
  const avgIncomeQ1 = getAvgQuarterIncome(janIncome, febIncome, marIncome)
  const avgIncomeQ2 = getAvgQuarterIncome(aprIncome, mayIncome, junIncome)
  const avgIncomeQ3 = getAvgQuarterIncome(julIncome, augIncome, sepIncome)
  const avgIncomeQ4 = getAvgQuarterIncome(octIncome, novIncome, decIncome)

  // calculate the expenses quarterly averages
  const avgExpensesQ1 = getAvgQuarterExpenses(
    janExpenses,
    febExpenses,
    marExpenses
  )
  const avgExpensesQ2 = getAvgQuarterExpenses(
    aprExpenses,
    mayExpenses,
    junExpenses
  )
  const avgExpensesQ3 = getAvgQuarterExpenses(
    julExpenses,
    augExpenses,
    sepExpenses
  )
  const avgExpensesQ4 = getAvgQuarterExpenses(
    octExpenses,
    novExpenses,
    decExpenses
  )

  // calculate the remaining average of each quarter
  const avgRemainingQ1 = getAvgQuarterRemaining(avgIncomeQ1, avgExpensesQ1)
  const avgRemainingQ2 = getAvgQuarterRemaining(avgIncomeQ2, avgExpensesQ2)
  const avgRemainingQ3 = getAvgQuarterRemaining(avgIncomeQ3, avgExpensesQ3)
  const avgRemainingQ4 = getAvgQuarterRemaining(avgIncomeQ4, avgExpensesQ4)

  // bar chart data for current year
  const currentYearBarChartData = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        // monthly income
        data: [
          janIncome,
          febIncome,
          marIncome,
          aprIncome,
          mayIncome,
          junIncome,
          julIncome,
          augIncome,
          sepIncome,
          octIncome,
          novIncome,
          decIncome,
        ],
        backgroundColor: ['#7F56D9'],
        hoverOffset: 4,
      },
      {
        // monthly expenses
        data: [
          janExpenses,
          febExpenses,
          marExpenses,
          aprExpenses,
          mayExpenses,
          junExpenses,
          julExpenses,
          augExpenses,
          sepExpenses,
          octExpenses,
          novExpenses,
          decExpenses,
        ],
        backgroundColor: ['#E9D7FE'],
        hoverOffset: 4,
      },
    ],
  }

  return (
    <>
      {showModal && (
        <Modal title='Add Transaction'>
          <TransactionsForm handleCancel={handleCancel} />
        </Modal>
      )}
      <MobileMenu />
      <DesktopMenu onClick={handleShowModal} />
      <IntroTopMobile
        title='Summary'
        onClick={handleShowModal}
      />
      <YearsCarouselMobile />
      <YearsCarouselDesktop />
      <div className={styles.pieCharts}>
        <PieChart
          title='Year 2023'
          chartData={currentYearData}
          labelOne='Income'
          labelTwo='Expenses'
          income={totalIncome}
          expenses={totalExpenses}
          remaining={totalIncome - totalExpenses}
          budget={0}
        />
        <PieChart
          title='Monthly Average'
          chartData={currentYearMonthlyAvgData}
          labelOne='Income'
          labelTwo='Expenses'
          income={totalMonthlyAvgIncome}
          expenses={totalMonthlyAvgExpenses}
          remaining={totalMonthlyAvgIncome - totalMonthlyAvgExpenses}
          budget={0}
        />
      </div>
      <div className={styles.averagesContainer}>
        <QuarterAverage
          title='Q1 Average'
          income={avgIncomeQ1}
          expenses={avgExpensesQ1}
          remaining={avgRemainingQ1}
        />
        <QuarterAverage
          title='Q2 Average'
          income={avgIncomeQ2}
          expenses={avgExpensesQ2}
          remaining={avgRemainingQ2}
        />
        <QuarterAverage
          title='Q3 Average'
          income={avgIncomeQ3}
          expenses={avgExpensesQ3}
          remaining={avgRemainingQ3}
        />
        <QuarterAverage
          title='Q4 Average'
          income={avgIncomeQ4}
          expenses={avgExpensesQ4}
          remaining={avgRemainingQ4}
        />
      </div>
      <div className={styles.barChart}>
        <BarChart
          title='Monthly Summary'
          chartData={currentYearBarChartData}
          labelOne='Income'
          labelTwo='Expenses'
        />
      </div>
      <div className={styles.monthlyDetailMobile}>
        <div className={styles.title}>Monthly Detail</div>
        <div className={styles.divider}>
          <MonthlyDetailMobileDivider />
        </div>
        <MonthlyDetailMobile
          month='January'
          income={1000}
          expenses={500}
          remaining={500}
          budget={800}
        />
      </div>
    </>
  )
}
