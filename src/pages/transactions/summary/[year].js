import { useRouter } from 'next/router'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useState } from 'react'

// components
import MobileMenu from '@/components/MobileMenu'
import DesktopMenu from '@/components/DesktopMenu'
import IntroTopMobile from '@/components/IntroTopMobile'
import Modal from '@/components/Modal'

export default function TransactionsSummary() {
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const { year } = router.query
  const { user } = useAuthContext()

  // hide the page content from non-logged in users
  // always run this if statement first
  if (!user) {
    return
  }

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleCancel = () => {
    setShowModal(false)
  }

  const handleConfirm = () => {
    console.log('Confirm button clicked')
  }

  return (
    <div>
      {showModal && (
        <Modal
          title='Add Transaction'
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
        />
      )}
      <MobileMenu />
      <IntroTopMobile
        title='Summary'
        onClick={handleShowModal}
      />
      <DesktopMenu />
      {/* Your transaction summary can go here */}
    </div>
  )
}
