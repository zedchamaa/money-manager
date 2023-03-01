import { AuthContextProvider } from '@/context/AuthContext'
import { useRouter } from 'next/router'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useEffect } from 'react'

// styles
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <AppWrapper
        Component={Component}
        pageProps={pageProps}
      />
    </AuthContextProvider>
  )
}

function AppWrapper({ Component, pageProps }) {
  const router = useRouter()
  const currentPath = router.pathname
  const { authIsReady, user } = useAuthContext()

  useEffect(() => {
    if (authIsReady) {
      if (currentPath === '/login' && user) {
        router.push('/')
      }
      if (currentPath === '/signup' && user) {
        router.push('/')
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
