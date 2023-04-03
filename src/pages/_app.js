import { AuthContextProvider } from '@/context/AuthContext'
import { useRouter } from 'next/router'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useEffect } from 'react'

// styles
import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

// libraries
import { ToastContainer } from 'react-toastify'
import TagManager from 'react-gtm-module'

// // implement Google Tag Manager
// TagManager.initialize({
//   gtmId: 'GTM-WMB43RQ',
// })

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <AppWrapper
        Component={Component}
        pageProps={pageProps}
      />
      <ToastContainer position='top-right' />
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
    // if user is logged in
    if (authIsReady) {
      if (currentPath === '/login' && user) {
        router.push(`/transactions/year/${currentYear}`)
      }
      if (currentPath === '/signup' && user) {
        router.push(`/transactions/year/${currentYear}`)
      }
      if (currentPath === '/_error' && user) {
        router.push(`/transactions/year/${currentYear}`)
      }
      // if user is not logged in
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
