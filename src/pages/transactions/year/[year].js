import { useRouter } from 'next/router'

export default function TransactionsYear() {
  const router = useRouter()
  const { year } = router.query

  return (
    <div>
      <h1>Transactions for {year}</h1>
      {/* Your transaction list and form can go here */}
    </div>
  )
}
