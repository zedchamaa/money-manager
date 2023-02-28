import { useRouter } from 'next/router'

export default function TransactionsSummary() {
  const router = useRouter()
  const { year } = router.query

  return (
    <div>
      <h1>Summary of transactions for {year}</h1>
      {/* Your transaction summary can go here */}
    </div>
  )
}
