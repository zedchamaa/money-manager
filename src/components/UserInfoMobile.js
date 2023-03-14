import { useLogout } from '@/hooks/useLogout'
import { useAuthContext } from '@/hooks/useAuthContext'

// styles
import styles from './UserInfoMobile.module.css'

// components
import SignoutIcon from './icons/SignoutIcon'
import ProfileIcon from './icons/ProfileIcon'

export default function UserInfoMobile() {
  const { user } = useAuthContext()
  const { logout } = useLogout()

  const handleLogout = () => {
    logout()
  }

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <ProfileIcon />
        {user.displayName}
      </div>
      <div
        className={styles.signOut}
        onClick={handleLogout}
      >
        <SignoutIcon />
        Sign Out
      </div>
    </div>
  )
}
