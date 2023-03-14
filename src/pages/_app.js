import { AuthContextProvider } from '@/context/AuthContext'
import { useRouter } from 'next/router'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useState, useEffect } from 'react'

// styles
import '@/styles/globals.css'

// components
import MobileMenu from '@/components/MobileMenu'
import DesktopMenu from '@/components/DesktopMenu'
import IntroTopMobile from '@/components/IntroTopMobile'
import Modal from '@/components/Modal'

export default function App({ Component, pageProps }) {
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const currentPath = router.pathname

  // update page title based on current page path
  let pageTitle

  currentPath.includes('summary')
    ? (pageTitle = 'Summary')
    : (pageTitle = 'Transactions')

  // show the modal
  const handleShowModal = () => {
    setShowModal(true)
  }

  // hide the modal
  const handleCancel = () => {
    setShowModal(false)
  }

  // submit form on confirm
  const handleConfirm = () => {
    console.log('Confirm button clicked')
  }

  return (
    <AuthContextProvider>
      <AppWrapper
        Component={Component}
        pageProps={pageProps}
      />
      {showModal && (
        <Modal
          title='Add Transaction'
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
        />
      )}
      <MobileMenu />
      <DesktopMenu />
      <IntroTopMobile
        title={pageTitle}
        onClick={handleShowModal}
      />
    </AuthContextProvider>
  )
}

function AppWrapper({ Component, pageProps }) {
  const router = useRouter()
  const currentPath = router.pathname
  const { authIsReady, user } = useAuthContext()

  // find the current year
  const date = new Date()
  const currentYear = date.getFullYear()

  useEffect(() => {
    if (authIsReady) {
      if (currentPath === '/login' && user) {
        router.push(`/transactions/summary/${currentYear}`)
      }
      if (currentPath === '/signup' && user) {
        router.push(`/transactions/summary/${currentYear}`)
      }
      if (
        !user &&
        currentPath !== '/login' &&
        !user &&
        currentPath !== '/signup' &&
        !user &&
        currentPath !== '/forgot-password' &&
        !user &&
        currentPath !== '/policy'
      ) {
        router.push('/login')
      }
    }
  }, [authIsReady, currentPath, user, router])

  return <Component {...pageProps} />
}
