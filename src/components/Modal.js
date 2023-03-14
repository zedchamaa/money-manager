// styles
import styles from './Modal.module.css'

// components
import TransactionsIcon from './icons/TransactionsIcon'

export default function Modal({
  children,
  handleCancel,
  handleConfirm,
  title,
}) {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.container}>
        <div className={styles.top}>
          <TransactionsIcon />
          <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.middle}>{children}</div>
        <div className={styles.bottom}>
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  )
}
