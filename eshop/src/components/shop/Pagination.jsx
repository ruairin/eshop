/** 
 * Methods for Pagination component
 * This implementation is a similified version of the following:
 * https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
 * 
 * @module Pagination
 * 
 */


import React from 'react';
import './Pagination.css';

/**
 * Create and update the pagination component
 * 
 * @param {*} props 
 * @param {string} props.totalNumberItems The total number of products available to display
 * @param {string} props.itemsPerPage The number of items to display per page
 * @param {string} props.currentPage The current page in the pagination component
 * @param {onPageChangeCallback} onPageChange Callback to run when the page is changed in the pagination component
 *
 */

const Pagination = (props) => {

  const { totalNumberItems, itemsPerPage, currentPage, onPageChange } = props;
  const separator = ' ... ';

  // utility function which returns an array of numbers [start, start+1, ..., end]
  const range = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, idx) => idx + start)
  }

  /**
   * Generate an array of items to display in the pagination compoment
   *
   * @param {string} props.totalNumberItems The total number of products available to display
   * @param {string} props.itemsPerPage The number of items to display per page
   * @param {string} props.currentPage The current page in the pagination component
   * @returns {Number[]}  Returns an array of items to display in the pagination component 
   *                      including separators, e.g. [1, ..., 3, 4, 5, ..., 20]
   */

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

  /**
   * Handler function for when next page (right arrow) is clicked
   */

  const onNextPage = () => {
    // only increase page if it's not already at the end
    console.log(pagesList);
    if (currentPage < pagesList[pagesList.length - 1]) {
      onPageChange(currentPage + 1);
    }
  }

  /**
   * Handler function for when previous page (left arrow) is clicked
   */

  const onPreviousPage = () => {
    // only decrease page if it's not already at the start
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }

  /**
   * Handler function for when a specific page is selected
   * 
   * @param {Number} pageNumber The page number that was selected
   * 
   */
  const onSelectPage = (pageNumber) => {
    onPageChange(pageNumber);
  }

  const pagesList = getPaginationItems(totalNumberItems, itemsPerPage, currentPage,);

  // If there's only one page of results, there's no need 
  // to display the pagination component
  if (pagesList.length < 2) {
    return null;
  }

  return (
    <>
      <ul className='pagination'>
        <li key="0" className='arrow' onClick={onPreviousPage}>{"<"}</li>

        {pagesList.map((page, index) => {
          const isSeparator = page === separator;
          const isActive = page === currentPage;

          return (
            <li key={index + 1} className={isActive ? 'page page-item active' : 'page page-item'}
              onClick={isSeparator ? null : () => onSelectPage(page)}>
              {page}
            </li>
          );

        })}

        <li key={pagesList.length + 1} className='arrow' onClick={onNextPage}>{">"}</li>
      </ul>
    </>
  );
}

export default Pagination;