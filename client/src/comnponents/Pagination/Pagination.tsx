import React, { JSX } from "react";
import ReactPaginate from "react-paginate";
//
import styles from "./Pagination.module.scss";

//
type PaginationPropsType = {
  onChangePage: (page: number) => void;
};

//
function Pagination({ onChangePage }: PaginationPropsType): JSX.Element {
  //
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={3}
      previousLabel="<"
      // renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
