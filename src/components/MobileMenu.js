// styles
import styles from './MobileMenu.module.css'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

// components
import Logo from './Logo'
import HamburgerMenuIcon from './icons/HamburgerMenuIcon'
import CloseIcon from './icons/CloseIcon'

export default function MobileMenu() {
  const [menuIsClosed, setMenuIsClosed] = useState(true)
  const router = useRouter()
  const { year } = router.query

  const handleOpenMenu = () => {
    setMenuIsClosed(false)
  }

  const handleCloseMenu = () => {
    setMenuIsClosed(true)
  }

  return (
    <>
      <div className={styles.container}>
        <Logo />
        {menuIsClosed && <HamburgerMenuIcon onClick={handleOpenMenu} />}
        {!menuIsClosed && <CloseIcon onClick={handleCloseMenu} />}
      </div>
      {!menuIsClosed && (
        <div className={styles.openedMenu}>
          <nav>
            <div className={styles.navItem}>
              <p>Icon</p>
              <Link href='/transactions/summary/2024'>Summary</Link>
            </div>
            <div className={styles.navItem}>
              <p>Icon</p>
              <p>Transactions</p>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
