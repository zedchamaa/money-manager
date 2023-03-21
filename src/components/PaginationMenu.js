// styles
import styles from './PaginationMenu.module.css'

// libraries
import ReactPaginate from 'react-paginate'

// components
import PaginationLeftArrow from './icons/PaginationLeftArrow'
import PaginationRightArrow from './icons/PaginationRightArrow'

export default function PaginationMenu({ pageCount, changePage }) {
  return (
    <div className={styles.container}>
      <ReactPaginate
        previousLabel={<PaginationLeftArrow />}
        nextLabel={<PaginationRightArrow />}
        pageCount={pageCount}
        onPageChange={changePage}
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        containerClassName={styles.paginationButtons}
        previousLinkClassName={styles.previousButton}
        nextLinkClassName={styles.nextButton}
        disabledClassName={styles.paginationDisabled}
        activeClassName={styles.paginationActive}
        pageClassName={styles.pageElement}
      />
    </div>
  )
}
