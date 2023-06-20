import React from "react";
import './Cart.css';

const Cart = ({ cart, products, onDeleteFromCart }) => {
  return (
    <>
      <div className="pa4" style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
        <h2 className='white'>Cart</h2>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type 
        specimen book. It has survived not only five centuries, but also the leap into 
        electronic typesetting, remaining essentially unchanged. It was popularised in 
        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
        and more recently with desktop publishing software like Aldus PageMaker including 
        versions of Lorem Ipsum.</p>
        <table className='f6 pa4' cellSpacing='0'>
          <thead>
            <tr>
              <th class="fw6 bb b--black-20 tl pb3 pr3 white">Title</th>
              <th class="fw6 bb b--black-20 tl pb3 pr3 white">Image</th>
              <th class="fw6 bb b--black-20 tl pb3 pr3 white">Quantity</th>
              <th class="fw6 bb b--black-20 tl pb3 pr3 white">Price</th>
              <th class="fw6 bb b--black-20 tl pb3 pr3 white">Delete Item</th>
            </tr>
          </thead>
          {
            cart.map((item) => {
              // get product details for item.id
              const product = products[item.id];
              const { id, title, price, image } = product;
              return (
                <>
                  <tr>
                    <td className='pv3 pr3 bb b--black-20 white'>{title}</td>
                    <td className='pv3 pr3 bb b--black-20 white'><img alt='productImage' src={`/images/${image}`} width={50} /></td>
                    <td className='pv3 pr3 bb b--black-20 white'>{item.qty}</td>
                    <td className='pv3 pr3 bb b--black-20 white'>{price}</td>
                    <td className='pv3 pr3 bb b--black-20 white link pointer underline' onClick={() => onDeleteFromCart(item.id)}>Delete</td>
                  </tr>
                </>
              );
            })
          }
        </table>
      </div>
    </>
  );
}

export default Cart;