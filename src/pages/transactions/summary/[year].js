import { useRouter } from 'next/router'
import { useAuthContext } from '@/hooks/useAuthContext'

// components
import MobileMenu from '@/components/MobileMenu'

export default function TransactionsSummary() {
  const router = useRouter()
  const { year } = router.query
  const { user } = useAuthContext()

  // hide the page content from non-logged in users
  // always run this if statement first
  if (!user) {
    return
  }

  return (
    <div>
      <MobileMenu />
      <h1>Summary of transactions for {year}</h1>
      {/* Your transaction summary can go here */}
    </div>
  )
}
