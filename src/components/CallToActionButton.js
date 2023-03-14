// styles
import styles from './CallToActionButton.module.css'

// components
import AddSquare from './icons/AddSquare'

export default function CallToActionButton({ title, onClick }) {
  return (
    <div
      className={styles.container}
      onClick={onClick}
    >
      <AddSquare />
      {title}
    </div>
  )
}
