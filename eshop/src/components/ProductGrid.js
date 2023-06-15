import React from "react";
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ products, onSelectProduct }) => {
  return (
    <div className='grid-container'>
      {
        products.map((product) => {
          return (
            <ProductCard product={product} onSelectProduct={onSelectProduct} />
          );
        })
      }
    </div>
  );
}

export default ProductGrid;
