// styles
import styles from './IntroTopMobile.module.css'

// components
import CallToActionButton from './CallToActionButton'

export default function IntroTopMobile({ title }) {
  return (
    <div className={styles.container}>
      {title}
      <CallToActionButton title='Add Transaction' />
    </div>
  )
}
