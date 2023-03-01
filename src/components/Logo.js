// components
import LogoIcon from './icons/LogoIcon'

// styles
import styles from './Logo.module.css'

export default function Logo() {
  return (
    <>
      <div className={styles.container}>
        <LogoIcon />
        <div className={styles.title}>MONEY MANAGER</div>
      </div>
    </>
  )
}
