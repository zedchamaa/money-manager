import Link from 'next/link'
import { useRouter } from 'next/router'

// styles
import styles from './YearsCarouselMobile.module.css'

export default function YearsCarouselMobile() {
  const router = useRouter()
  const { year } = router.query
  const currentPath = router.pathname

  // dynamically update page url
  let path

  currentPath.includes('summary')
    ? (path = '/transactions/summary/')
    : (path = '/transactions/year/')

  return (
    <div className={styles.container}>
      <Link href={path + '2023'}>
        <div className={year === '2023' ? styles.selectedYear : styles.year}>
          Year 2023
        </div>
      </Link>
      <Link href={path + '2024'}>
        <div className={year === '2024' ? styles.selectedYear : styles.year}>
          Year 2024
        </div>
      </Link>
      <Link href={path + '2025'}>
        <div className={year === '2025' ? styles.selectedYear : styles.year}>
          Year 2025
        </div>
      </Link>
      <Link href={path + '2026'}>
        <div className={year === '2026' ? styles.selectedYear : styles.year}>
          Year 2026
        </div>
      </Link>
      <Link href={path + '2027'}>
        <div className={year === '2027' ? styles.selectedYear : styles.year}>
          Year 2027
        </div>
      </Link>
      <Link href={path + '2028'}>
        <div className={year === '2028' ? styles.selectedYear : styles.year}>
          Year 2028
        </div>
      </Link>
      <Link href={path + '2029'}>
        <div className={year === '2029' ? styles.selectedYear : styles.year}>
          Year 2029
        </div>
      </Link>
      <Link href={path + '2030'}>
        <div className={year === '2030' ? styles.selectedYear : styles.year}>
          Year 2030
        </div>
      </Link>
      <Link href={path + '2031'}>
        <div className={year === '2031' ? styles.selectedYear : styles.year}>
          Year 2031
        </div>
      </Link>
      <Link href={path + '2032'}>
        <div className={year === '2032' ? styles.selectedYear : styles.year}>
          Year 2032
        </div>
      </Link>
    </div>
  )
}
