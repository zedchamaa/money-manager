// styles
import styles from './Footer.module.css'

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.copyright}>
        Copyright &copy; {currentYear}
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://zedchamaa.com'
        >
          zedchamaa
        </a>
      </div>
    </div>
  )
}
