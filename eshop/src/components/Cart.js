import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import './Cart.css';

const Cart = ({ cart, onDeleteFromCart }) => {

  const { products } = useRouteLoaderData('root');

  return (
    <>
      <div className="px-20 py-10">
        <div className="" style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
          <h2 className='page-title-font'>Cart</h2>

          <div className="pt-5 pb-10">
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type
              specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in
              the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
              and more recently with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.</p>
          </div>
          <table className='py-10' cellSpacing='0'>
            <thead>
              <tr>
                <th className="font-bold border-b b--black-20 pb-3 tl">Title</th>
                <th className="font-bold border-b b--black-20 pb-3 tl">Image</th>
                <th className="font-bold border-b b--black-20 pb-3 tl">Quantity</th>
                <th className="font-bold border-b b--black-20 pb-3 tl">Price</th>
                <th className="font-bold border-b b--black-20 pb-3 tl">Delete Item</th>
              </tr>
            </thead>
            {
              cart.length > 0
                ?
                cart.map((item) => {
                  // get product details for item.id
                  const product = products[item.id];
                  const { title, price, image } = product;
                  return (
                    <>
                      <tr>
                        <td className='font-bold border-b b--black-20 py-3 tl'>{title}</td>
                        <td className='font-bold border-b b--black-20 py-3 tl'><img alt='productImage' src={`/images/${image}`} width={50} /></td>
                        <td className='font-bold border-b b--black-20 py-3 tl'>{item.qty}</td>
                        <td className='font-bold border-b b--black-20 py-3 tl'>{price}</td>
                        <td className='font-bold border-b b--black-20 py-3 tl link pointer underline' onClick={() => onDeleteFromCart(item.id)}>Delete</td>
                      </tr>
                    </>
                  );
                })
                :
                <tr>
                  <td className='font-bold border-b b--black-20 pb-3 text-center pt-6 pb-6' colSpan={5}> Cart is currently empty </td>
                </tr>
            }
          </table>
        </div>
      </div>
    </>
  );
}

export default Cart;