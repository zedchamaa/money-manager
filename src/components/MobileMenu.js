// styles
import styles from './MobileMenu.module.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

// components
import Logo from './Logo'
import HamburgerMenuIcon from './icons/HamburgerMenuIcon'
import CloseIcon from './icons/CloseIcon'
import GraphIcon from './icons/GraphIcon'
import ConnectionIcon from './icons/ConnectionIcon'

export default function MobileMenu() {
  const [menuIsClosed, setMenuIsClosed] = useState(true)
  const router = useRouter()
  const currentPath = router.pathname
  const { year } = router.query
  const [summarySelected, setSummarySelected] = useState(false)
  const [transactionsSelected, setTransactionsSelected] = useState(false)

  let defaultColor = '#667085'
  let selectedColor = '#7F56D9'
  let summaryColor
  let transactionsColor

  useEffect(() => {
    if (currentPath.includes('summary')) {
      setSummarySelected(true)
      setTransactionsSelected(false)
    } else {
      setSummarySelected(false)
      setTransactionsSelected(true)
    }
  }, [currentPath])

  if (currentPath.includes('summary')) {
    summaryColor = selectedColor
    transactionsColor = defaultColor
  } else {
    transactionsColor = selectedColor
    summaryColor = defaultColor
  }

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
            <div
              className={
                summarySelected ? styles.navItemSelected : styles.navItem
              }
            >
              <GraphIcon color={summaryColor} />
              <Link href='/transactions/summary/2024'>Summary</Link>
            </div>
            <div
              className={
                transactionsSelected ? styles.navItemSelected : styles.navItem
              }
            >
              <ConnectionIcon color={transactionsColor} />
              <p>Transactions</p>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
