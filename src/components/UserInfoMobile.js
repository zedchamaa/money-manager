import { useLogout } from '@/hooks/useLogout'

// styles
import styles from './UserInfoMobile.module.css'

// components
import SignoutIcon from './icons/SignoutIcon'
import ProfileIcon from './icons/ProfileIcon'

export default function userInfoMobile() {
  const { logout } = useLogout()

  const handleLogout = () => {
    logout()
  }

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <ProfileIcon />
        <p>John Doe</p>
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
