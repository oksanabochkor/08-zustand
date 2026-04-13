"use client";

import ReactPaginate from "react-paginate";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={page - 1}
      onPageChange={(e) => onPageChange(e.selected + 1)}
      previousLabel="Prev"
      nextLabel="Next"
      breakLabel="..."
      containerClassName="pagination"
      activeClassName="active"
    />
  );
}

