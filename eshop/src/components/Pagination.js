// This implementation is a similified version of the following:
// https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/

import React, { useState } from 'react';
import './Pagination.css';

const Pagination = (props) => {

  const { totalNumberItems, itemsPerPage, currentPage, onPageChange } = props;
  const separator = ' ... ';

  // utility function which returns an array of numbers [start, start+1, ..., end]
  const range = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, idx) => idx + start)
  }

  // returns and array of items to display in the pagination component including separators, e.g.
  // 1, ..., 3, 4, 5, ..., 20]
  const getPaginationItems = (totalNumberItems, itemsPerPage, currentPage, currentPageSiblingCount = 1) => {

    const firstPage = 1;
    const lastPage = Math.ceil(totalNumberItems / itemsPerPage);
    const numPages = lastPage - firstPage + 1;

    // Get the sibling Page numbers either side of the current page
    const leftMostSibling = Math.max(firstPage, currentPage - currentPageSiblingCount);
    const rightMostSibling = Math.min(lastPage, currentPage + currentPageSiblingCount);

    // Calculate the max total number of pages that can be in pagination
    // = current page + 2*currentPageSiblingCount + first page + last page + 2*separators
    const maxNumPagesToDisplay = 2 * currentPageSiblingCount + 5;

    // if number of pages is less than the maxNumPagesToDisplay
    // just return the array [1, 2, 3, ..., lastPage]
    if (numPages < maxNumPagesToDisplay) {
      return range(firstPage, lastPage);
    }

    // booleans to decide whether left/right separators are needed
    const showLeftSeparator = leftMostSibling > firstPage + 1;
    const showRightSeparator = rightMostSibling < lastPage - 1;

    // both left and right separators are needed, e.g.
    // 1, ..., 3, 4, 5, ..., 20]  (current page =4)
    if (showLeftSeparator && showRightSeparator) {
      const middleRange = range(leftMostSibling, rightMostSibling);
      return [firstPage, separator, ...middleRange, separator, lastPage];
    }

    // only right separators are needed, e.g.
    // [1, 2, 3, ..., 20]  (current page =2)
    if (!showLeftSeparator && showRightSeparator) {
      const leftRange = range(firstPage, rightMostSibling);
      return [...leftRange, separator, lastPage];
    }

    // only left separators are needed, e.g.
    // [1, ..., 19, 20]  (current page =19)
    if (showLeftSeparator && !showRightSeparator) {
      const rightRange = range(leftMostSibling, lastPage);
      return [firstPage, separator, ...rightRange];
    }
  }

  const onNextPage = () => {
    // only increase page if it's not already at the end
    console.log(pagesList);
    if (currentPage < pagesList[pagesList.length - 1]) {
      onPageChange(currentPage + 1);
    }
  }

  const onPreviousPage = () => {
    // only decrease page if it's not already at the start
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }

  const onSelectPage = (pageNumber) => {
    onPageChange(pageNumber);
  }

  const pagesList = getPaginationItems(totalNumberItems, itemsPerPage, currentPage,);

  if (pagesList.length < 2) {
    return null;
  }

  return (
    <>
      <ul className='pagination'>
        <li className='arrow' onClick={onPreviousPage}>{"<"}</li>

        {pagesList.map(page => {
          const isSeparator = page === separator;
          const isActive = page === currentPage;

          return (
            <li className={isActive ? 'page active' : 'page'}
              onClick={isSeparator ? null : () => onSelectPage(page)}>
              {page}
            </li>
          );

        })}

        <li className='arrow' onClick={onNextPage}>{">"}</li>
      </ul>
    </>
  );
}

export default Pagination;