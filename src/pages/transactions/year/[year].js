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

export default function TransactionsYear() {
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
    return <p>Please log in to view this page</p>
  }

  if (user && documents) {
    console.log(documents)
  } else if (error) {
    console.log(error)
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
