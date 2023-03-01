import { useAuthContext } from '@/hooks/useAuthContext'

export default function HomePage() {
  const { user } = useAuthContext()

  // hide the page content from non-logged in users
  // always run this if statement first
  if (!user) {
    return
  }

  return <div>Home Page</div>
}
