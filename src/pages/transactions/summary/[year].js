import { useRouter } from 'next/router'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useState } from 'react'

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

export default function TransactionsSummary() {
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const { year } = router.query
  const { user } = useAuthContext()

  // pie chart data for current year
  const [currentYearData] = useState({
    datasets: [
      {
        data: [1000, 5000],
        backgroundColor: ['#7F56D9', '#E9D7FE'],
        hoverOffset: 4,
      },
    ],
  })

  // hide the page content from non-logged in users
  // always run this if statement first
  if (!user) {
    return
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
        />
        <PieChart
          title='Monthly Average'
          chartData={currentYearData}
          labelOne='Income'
          labelTwo='Expenses'
        />
      </div>
    </>
  )
}
