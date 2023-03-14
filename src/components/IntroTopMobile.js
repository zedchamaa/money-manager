// styles
import styles from './IntroTopMobile.module.css'

// components
import CallToActionButton from './CallToActionButton'

export default function IntroTopMobile({ title, onClick }) {
  return (
    <div className={styles.container}>
      {title}
      <CallToActionButton
        title='Add Transaction'
        onClick={onClick}
      />
    </div>
  )
}
