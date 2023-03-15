// styles
import styles from './Modal.module.css'

// components
import TransactionsIcon from './icons/TransactionsIcon'

export default function Modal({ children, title }) {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.container}>
        <div className={styles.top}>
          <TransactionsIcon />
          <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.middle}>{children}</div>
      </div>
    </div>
  )
}
