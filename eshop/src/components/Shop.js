import React from "react";
import CategoryCard from './CategoryCard';

import './Shop.css';


const ProductCategories = ({ categories, onSelectCategory }) => {

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

        <div className='grid-container'>
          {
            // only render currentGridItems (i.e. current subset of products based on pagination)
            categories.map((category) => {
              return (
                <CategoryCard category={category} onSelectCategory={onSelectCategory} />
              );
            })
          }
        </div>
      </div>
    </>
  );
}

export default ProductCategories;
