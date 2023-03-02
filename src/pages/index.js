import { useAuthContext } from '@/hooks/useAuthContext'
import { useLogout } from '@/hooks/useLogout'

export default function HomePage() {
  const { user } = useAuthContext()
  const { logout } = useLogout()

  // hide the page content from non-logged in users
  // always run this if statement first
  if (!user) {
    return
  }

  const handleSignout = () => {
    logout()
  }

  return (
    <>
      <div>Home Page</div>
      <button onClick={handleSignout}>Log Out</button>
    </>
  )
}
