import React, { useMemo, useState } from "react";
import ProductCard from './ProductCard';
import Pagination from './Pagination';

import './ProductGrid.css';


const ProductGrid = ({ products, onSelectProduct }) => {

  // current page for pagination display
  const [currentPage, setCurrentPage] = useState(1);

  // number of items to display on page
  const [pageSize, setPageSize] = useState(10);

  const handlePageSizeChange = (e) => {
    // Note: e.target.value is a string. 
    // Convert to number before setting as pageSize
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  }

  // start index in products array for the current grid items
  const getCurrentGridIdxStart = () => {
    return (currentPage - 1) * pageSize;
  }

  // end index in products array for the current grid items
  const getCurrentGridIdxEnd = () => {
    return Math.min(getCurrentGridIdxStart() + pageSize, products.length);
  }

  // return an array of items to display on this page
  // based on the pagination 
  const currentGridItems = useMemo(() => {

    const idxStart = getCurrentGridIdxStart();
    const idxEnd = getCurrentGridIdxEnd();

    return products.slice(idxStart, idxEnd);

  }, [currentPage, pageSize]);

  return (
    <>
      <div className='ml5 mr5'>
        <h1>Shop</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type
          specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum.</p>

        <div className='products-filter-box'>
          <div className='products-filter-items'>
            <label className='pr3 white' for='show-limit'>Show: </label>
            <select id='show-limit' value={pageSize} onChange={handlePageSizeChange}>
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>
        </div>
      </div>

      <div className='grid-container'>
        {
          // only render currentGridItems (i.e. current subset of products based on pagination)
          currentGridItems.map((product) => {
            return (
              <ProductCard product={product} onSelectProduct={onSelectProduct} />
            );
          })
        }
      </div>

      <div className='ml5 mr5'>
        <div className='pagination-container'>
          <div className='pagination-selector'>
            <Pagination 
              totalNumberItems={products.length} 
              itemsPerPage={pageSize} 
              currentPage={currentPage} 
              onPageChange={setCurrentPage} 
            />
          </div>
          <div className='pagination-info'>
            <p>{`Showing ${getCurrentGridIdxStart()+1}-${getCurrentGridIdxEnd()} of ${products.length} items`}</p>
          </div>  
        </div>
      </div>
    </>
  );
}


export default ProductGrid;
