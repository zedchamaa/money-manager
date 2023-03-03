import Link from 'next/link'

// components
import LogoIcon from './icons/LogoIcon'

// styles
import styles from './Logo.module.css'

export default function Logo({ link }) {
  return (
    <>
      <Link href={link || '/'}>
        <div className={styles.container}>
          <LogoIcon />
          <div className={styles.title}>MONEY MANAGER</div>
        </div>
      </Link>
    </>
  )
}
