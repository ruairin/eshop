import React, { useState } from 'react';
import { Link, useParams, useRouteLoaderData } from "react-router-dom";
import './ProductView.css';
import 'tachyons';

const ProductView = ({ onAddToCart }) => {
  const params = useParams();
  const productId = params.productId ? Number(params.productId) : null;

  const { products } = useRouteLoaderData('root');
  const product = products[productId];
  const { id, title, price, description, image, inventory } = product;

  // State for reading <input> for number to add to cart
  const [qty, setQty] = useState(1);

  return (
    <>
      <div className='ma4'>
        <Link to={`/shop/category/${product.category_id}`}>
          <button>Back</button>
        </Link>
        <h1>{title}</h1>

        <div className='row'>
          <div className='column box'>
            <img alt='product' src={`/images/${image}`} width={400} />
          </div>

          <div className='column box'>
            <p>{description}</p>
            <p>Price: {price}</p>
            <p>Inventory: {inventory}</p>
            
            <br></br>
            <input
              id='qty'
              type='text'
              size='10'
              pattern='[0-9]*'
              defaultValue={qty}
              // Only allow numeric values to be entered
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              onInput={e => setQty(e.target.value)}
            />
            <button onClick={() => onAddToCart(id, qty)}>Add to Cart</button>
          </div>
        </div>

      </div>
    </>
  );
}

export default ProductView;