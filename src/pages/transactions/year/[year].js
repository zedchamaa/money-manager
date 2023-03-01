import { useRouter } from 'next/router'
import { useAuthContext } from '@/hooks/useAuthContext'

export default function TransactionsYear() {
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
      <h1>Transactions for {year}</h1>
      {/* Your transaction list and form can go here */}
    </div>
  )
}
