import React, { useState } from 'react';
import { Link, useParams, useRouteLoaderData } from "react-router-dom";
import './ProductView.css';

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
      <div className='mx-8 my-4 px-8 py-8'>
        <Link to={`/shop/category/${product.category_id}`}>
          <button className='px-2 py-2 my-2 font-bold bg-sky-900 text-white'>Back</button>
        </Link>
        <h1 className='font-bold page-title-font'>{title}</h1>

        <div className='container mx-auto pt-4'>
          <div className='grid grid-cols-2 gap-6'>


            <div>
              {/* <div className='column box'> */}
              <img alt='product' src={`/images/${image}`} width={250} />
            </div>

            <div className='px-8'>
              <div className='flex flex-col gap-y-4'>
                <div>
                  <p className='font-bold'>Description: </p>
                  <p>{description}</p>
                </div>
                <div>
                  <p className='font-bold'>Price: </p>
                  <p>€{price}</p>
                </div>
                <div>
                  <p className='font-bold'>In Stock : </p>
                  <p>{inventory}</p>
                </div>
                <div>
                  <div className=''>
                    <label className='block font-bold mb-2'>Quantity:</label>
                    <input
                      className='shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-sky-700 focus:shadow-outline'
                      id='qty'
                      type='text'
                      size='10'
                      pattern='[0-9]*'
                      placeholder='Enter Quantity'
                      defaultValue={qty}
                      // Only allow numeric values to be entered
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      onInput={e => setQty(e.target.value)}
                    />
                  </div>
                  <button className='mt-6 px-4 py-4 rounded font-bold bg-orange-400 hover:bg-orange-600' onClick={() => onAddToCart(id, qty)}>Add to Cart</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default ProductView;