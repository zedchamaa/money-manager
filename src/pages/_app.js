import { AuthContextProvider } from '@/context/AuthContext'

// styles
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}
