import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import 'tachyons';

import ProductGrid from '../components/ProductGrid';
import ProductView from '../components/ProductView';
import Cart from '../components/Cart';


// Product DB placeholder
const products = [
  {
    id: '0',
    title: 'Product 1',
    price: 2.99,
    description: 'This is product 1',
    prod_code: 'SKU001',
    image: '300.jpg',
    inventory: 100
  },
  {
    id: '1',
    title: 'Product 2',
    price: 2.99,
    description: 'This is product 2',
    prod_code: 'SKU002',
    image: '300.jpg',
    inventory: 100
  },
  {
    id: '2',
    title: 'Product 3',
    price: 2.99,
    description: 'This is product 3',
    prod_code: 'SKU003',
    image: '300.jpg',
    inventory: 100
  }
];

// Cart DB placeholder
let cart = [
  // { id: 0, qty: 4 },
  // { id: 1, qty: 8 }
]

const routes = Object.freeze({
  SHOP: 'SHOP',
  CART: 'CART'
});

function App() {

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [route, setRoute] = useState(routes.SHOP);

  const onSelectProduct = (id) => {
    console.log(id);
    setSelectedProduct(id);
  }

  const onAddToCart = (id, qty) => {
    const i = cart.findIndex(item => item.id === id);
    if (i > -1) { // id already in cart
      cart[i].qty += qty;
    } else { // id not in cart already
      cart.push(
        { id: id, qty: qty }
      )
    }
    window.alert("Added to Cart");
    console.log(id, qty);
    console.log(cart);
  }

  const onDeleteFromCart = (id) => {
    const i = cart.findIndex(item => item.id === id);
    try {
      cart.splice(i, 1);
    } catch {
      window.alert('Error deleting item');
    }

    // refresh the cart component
    onRouteChange(routes.CART);
  }

  const onRouteChange = (route) => {
    setRoute(route);
  }


  return (
    <div>
      <div className='banner'>
        <h1 className='f1 white tc'>BeeShop</h1>

        {/* onclick update route to cart component */}
        <div className='mt3'>
          <p className='f4 white tr pr5 mt3 mb2 link underline pointer' onClick={() => onRouteChange(routes.SHOP)}>Shop</p>
          <p className='f4 white tr pr5 mt2 mb2 link underline pointer' onClick={() => onRouteChange(routes.CART)}>Cart</p>
        </div>
      </div>

      <div className='tc ba'>
        <div class="bg-black-90 w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
          <nav class="f6 fw6 ttu tracked">
            <a class="link dim white dib mr3" href="#" title="Home">Home</a>
            <a class="link dim white dib mr3" href="#" title="About">About</a>
            <a class="link dim white dib mr3" href="#" title="Shop">Shop</a>
            <a class="link dim white dib" href="#" title="Contact">Contact</a>
          </nav>
        </div>
      </div>

      {
        route === routes.SHOP
          ?
          selectedProduct
            ?
            <ProductView
              product={products[selectedProduct]}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
            />
            :
            <ProductGrid
              products={products}
              onSelectProduct={onSelectProduct}
            />
          :
          <Cart
            cart={cart}
            products={products}
            onDeleteFromCart={onDeleteFromCart}
          />
      }

      <footer>
        <div className='tc ba'>
          <h1 className='f4 white'>Footer</h1>
        </div>
      </footer>
    </div>
  );
}

export default App;
