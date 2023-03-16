import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef } from 'react'

// styles
import styles from './YearsCarouselDesktop.module.css'

// components
import LeftArrow from './icons/LeftArrow'
import RightArrow from './icons/RightArrow'

export default function YearsCarouselDesktop() {
  const router = useRouter()
  const { year } = router.query
  const currentPath = router.pathname
  const yearsContainerRef = useRef(null)

  // dynamically update page url
  let path

  currentPath.includes('summary')
    ? (path = '/transactions/summary/')
    : (path = '/transactions/year/')

  // scroll the years container to the left
  const handleScrollLeft = () => {
    const container = yearsContainerRef.current
    container.scrollBy({
      left: -500,
      behavior: 'smooth',
    })
  }

  // scroll the years container to the right
  const handleScrollRight = () => {
    const container = yearsContainerRef.current
    container.scrollBy({
      left: 500,
      behavior: 'smooth',
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.arrow}>
        <LeftArrow onClick={handleScrollLeft} />
      </div>
      <div
        className={styles.years}
        ref={yearsContainerRef}
      >
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
      <div className={styles.arrow}>
        <RightArrow onClick={handleScrollRight} />
      </div>
    </div>
  )
}
