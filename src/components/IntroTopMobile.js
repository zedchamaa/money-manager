import { useRouter } from 'next/router'

// styles
import styles from './IntroTopMobile.module.css'

// components
import CallToActionButton from './CallToActionButton'

export default function IntroTopMobile({ title, onClick }) {
  const router = useRouter()
  const currentPath = router.pathname

  return (
    <div className={styles.container}>
      {title}
      {currentPath.includes('summary') ? (
        ''
      ) : (
        <CallToActionButton
          title='Add Transaction'
          onClick={onClick}
        />
      )}
    </div>
  )
}
