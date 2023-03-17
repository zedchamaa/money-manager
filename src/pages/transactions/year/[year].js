import { useRouter } from 'next/router'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useState } from 'react'

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

export default function TransactionsYear() {
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const { year } = router.query
  const { user } = useAuthContext()

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
        title='Transactions'
        onClick={handleShowModal}
      />
      <YearsCarouselMobile />
      <YearsCarouselDesktop />
      <TransactionsSummaryMobile
        transactions={24}
        income={10000}
        expenses={5000}
        balance={5000}
      />
      <TransactionsSummaryDesktop
        transactions={24}
        income={10000}
        expenses={5000}
        balance={5000}
      />
    </>
  )
}
