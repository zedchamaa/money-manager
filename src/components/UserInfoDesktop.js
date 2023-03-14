import { useLogout } from '@/hooks/useLogout'
import { useAuthContext } from '@/hooks/useAuthContext'

// styles
import styles from './UserInfoDesktop.module.css'

// components
import SignoutIcon from './icons/SignoutIcon'
import ProfileIcon from './icons/ProfileIcon'

export default function UserInfoDesktop() {
  const { user } = useAuthContext()
  const { logout } = useLogout()

  const handleLogout = () => {
    logout()
  }

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <ProfileIcon />
        {user && user.displayName}
        <SignoutIcon onClick={handleLogout} />
      </div>
    </div>
  )
}
