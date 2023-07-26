/** 
 * Methods for ProductView component
 * 
 * @module ProductView
 * 
 */

import React, { useState } from 'react';
import { Link, useParams, useRouteLoaderData, Form, redirect } from "react-router-dom";
import { addCartItem } from '../../api/cart';

import './ProductView.css';

/**
 * react-router action function for product view component
 * (adds item to cart)
 * 
 */

export async function action({ request }) {

  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const result = await addCartItem(data.id, data.qty);

  if (result instanceof Error) {
    if (result.message === '401') {
      alert('Please sign in to continue');
      return redirect('/signIn/');
    }
    alert('Error adding cart item');
  } else {
    alert('Item added to cart')
    return result;
  }
  return null;
}

/**
 * Generates a ProductView component
 * (i.e. Product details page)
 * 
 */

const ProductView = () => {
  const params = useParams();
  const productId = params.productId ? Number(params.productId) : null;

  const { products } = useRouteLoaderData('root');
  const product = products.find(obj => obj.id === productId);

  const { id, title, price, description, image_name, inventory } = product;

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
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>

            <div>
              <img alt='product' src={process.env.REACT_APP_API_URL + `/${image_name}`} width={250} />
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
                    <Form method='post' id='add-to-cart'>
                      <label className='block font-bold mb-2'>Quantity:</label>
                      <input
                        className='shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-sky-700 focus:shadow-outline'
                        id='qty'
                        name='qty'
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

                      <button
                        className='mx-6 px-4 py-4 rounded font-bold bg-orange-400 hover:bg-orange-600'
                        value={id}
                        name='id'
                        type='submit'
                      >
                        Add to Cart
                      </button>
                    </Form>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div >
    </>
  );
}

export default ProductView;