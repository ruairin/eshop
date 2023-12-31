/** 
 * Methods for ProductCard component
 * 
 * @module ProductGrid
 * 
 */

import React, { useMemo, useState } from "react";
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import { useParams, useRouteLoaderData } from "react-router-dom";

import './ProductGrid.css';

/**
 * Generates a grid of products based on the range of indices set by 
 * the pagination component
 *  
 */

const ProductGrid = () => {
  const params = useParams();
  const categoryId = Number(params.categoryId);
  const { products, categories } = useRouteLoaderData('root');
  const category = categories.find(obj => obj.id === categoryId);

  // current page for pagination display
  const [currentPage, setCurrentPage] = useState(1);

  // number of items to display on page
  const [pageSize, setPageSize] = useState(10);

  /**
   * Update the state when a new page size is selected
   * 
   * @param {*} e Event triggered by setting a new page size
   */
  const handlePageSizeChange = (e) => {
    // Note: e.target.value is a string. 
    // Convert to number before setting as pageSize
    setPageSize(Number(e.target.value));
    // always reset to the first page
    setCurrentPage(1);
  }

  // start and end index in products array for the current grid items
  const currentGridIdxStart = (currentPage - 1) * pageSize;
  const currentGridIdxEnd = Math.min(currentGridIdxStart + pageSize, products.length);

  const productsInCategory = useMemo(() => {
    return products.filter((product) => { return product.category_id === categoryId });
  }, [products, categoryId]);

  /**
   * Return an array of items to display on this page
   * based on the pagination 
   *  
   */ 
  const currentGridItems = useMemo(() => {

    const idxStart = currentGridIdxStart;
    const idxEnd = currentGridIdxEnd;

    return productsInCategory.slice(idxStart, idxEnd);

  }, [productsInCategory, currentGridIdxStart, currentGridIdxEnd]);

  return (
    <>
      <div className=" px-10 py-10">
        <div className="page-title-font py-2">
          <h2>{`${category.title}`}</h2>
        </div>
        <div className="pt-2 pb-10">
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum.</p>
        </div>

        <div className='products-filter-box'>
          <div className='products-filter-items'>
            <label className='pr3 white' htmlFor='show-limit'>Show: </label>
            <select id='show-limit' value={pageSize} onChange={handlePageSizeChange}>
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>
        </div>


        <div className='grid-container'>
          {
            // only render currentGridItems (i.e. current subset of products based on pagination)
            currentGridItems.map((product) => {
              return (
                <ProductCard key={product.id} product={product} />
              );
            })
          }
        </div>

        <div className='ml5 mr5'>
          <div className='pagination-container'>
            <div className='pagination-selector'>
              <Pagination
                totalNumberItems={productsInCategory.length}
                itemsPerPage={pageSize}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
            <div className='pagination-info'>
              <p>{`Showing ${currentGridIdxStart + 1} - ${currentGridIdxEnd} of ${productsInCategory.length} items`}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default ProductGrid;
