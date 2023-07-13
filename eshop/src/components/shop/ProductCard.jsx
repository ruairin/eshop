/** 
 * Methods for ProductCard component
 * 
 * @module ProductCard
 * 
 */

import React from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

/**
 * Generates a ProductCard
 * 
 * @typedef {Object} product 
 * @property {string} id            Product id
 * @property {string} title         Product title
 * @property {string} price         Product price
 * @property {string} description   Long description of the product
 * @property {string} product_code  Product code
 * @property {string} image_name    Image filename for the product
 * 
 * @param {product} product The product data
 * 
 */

const ProductCard = ({ product }) => {
  const { id, title, price, image_name } = product;
  return (
    // <div className='bg-light-green dib br3 pa3 ma2'>
    <Link to={`/shop/products/${id}`}>
      <div className='group px-6 py-3 max-w-sm rounded overflow-hidden shadow-lg'>
        {/* Note: /images/ below refers to the images folder within /public/ */}
        <img alt='product' src={process.env.REACT_APP_API_URL + `/${image_name}`} width={300} />
        <div className="px-2 py-2">
          <div className='font-bold text-xl mb-2'>
            <h2>{title}</h2>
          </div>
          <p>€{price}</p>

          <div className="mt-2 text-right">
            <ArrowForwardIosIcon sx={{ fontSize: 40 }} className="px-2 py-2 text-orange-400 group-hover:bg-orange-400 group-hover:text-white" />
          </div>

        </div>
      </div >
    </Link>
  );
}

export default ProductCard;