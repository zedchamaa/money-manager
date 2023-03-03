import { useAuthContext } from '@/hooks/useAuthContext'

// components
import MobileMenu from '@/components/MobileMenu'

export default function HomePage() {
  const { user } = useAuthContext()

  // hide the page content from non-logged in users
  // always run this if statement first
  if (!user) {
    return
  }

  return (
    <>
      <MobileMenu />
    </>
  )
}
