import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import 'tachyons';

import ProductGrid from '../components/ProductGrid';
import ProductView from '../components/ProductView';
import Cart from '../components/Cart';
import SignIn from '../components/SignIn';


// ======= DB Placeholders =========
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

const users = [
  {
    id: 0,
    email: 'ted@gmail.com',
    firstName: 'Ted',
    lastName: 'Danson'
  },
  {
    id: 1,
    email: 'mike@gmail.com',
    firstName: 'Mike',
    lastName: 'Mahoney'
  },
  {
    id: 2,
    email: 'jack@gmail.com',
    firstName: 'Jack',
    lastName: 'Jones'
  },
]

const login = [
  { email: 'ted@gmail.com', hash: '1234' },
  { email: 'mike@gmail.com', hash: 'xxxx' },
  { email: 'jack@gmail.com', hash: 'YYYY' },
]

// ======= /DB Placeholders =========

const routes = Object.freeze({
  SHOP: 'SHOP',
  CART: 'CART',
  SIGN_IN: 'SIGN_IN'
});

function App() {

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [route, setRoute] = useState(routes.SHOP);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);

  const onSelectProduct = (id) => {
    console.log(id);
    setSelectedProduct(id);
  }

  const onAddToCart = (id, qty) => {
    const newCart = [...cart];
    const i = newCart.findIndex(item => item.id === id);
    if (i > -1) { // id already in cart
      newCart[i].qty += qty;
    } else { // id not in cart already
      newCart.push(
        { id: id, qty: qty }
      )
    }
    setCart(newCart);
    window.alert("Added to Cart");
    console.log(id, qty);
    console.log(cart);
  }

  const onDeleteFromCart = (id) => {
    const newCart = [...cart];
    const i = newCart.findIndex(item => item.id === id);
    try {
      newCart.splice(i, 1);
    } catch {
      window.alert('Error deleting item');
    }
    setCart(newCart);
  }

  const onRouteChange = (route) => {
    setRoute(route);
  }

  const onSignIn = (user) => {
    loadUser(user);
    setIsSignedIn(true);
    setRoute(routes.SHOP);
  }

  const onSignOut = () => {
    loadUser({});
    setIsSignedIn(false);
    setRoute(routes.SHOP);
  }

  const loadUser = (user) => {
    setUser({
      id: user.id,
      email: user.email,
      joined: user.joined,
      firstName: user.firstName,
      lastName: user.lastName
    });
  }

  // Logic for routing
  let display = null;
  switch (route) {
    case (routes.SHOP):
      display = selectedProduct
        ? <ProductView product={products[selectedProduct]} onSelectProduct={onSelectProduct} onAddToCart={onAddToCart} />
        : <ProductGrid products={products} onSelectProduct={onSelectProduct} />
      break;
    case (routes.CART):
      display = <Cart cart={cart} products={products} onDeleteFromCart={onDeleteFromCart} />
      break;
    case (routes.SIGN_IN):
      display = <SignIn onSignIn={onSignIn} login={login} users={users} />
      break;
    default:
      display = <ProductGrid products={products} onSelectProduct={onSelectProduct} />
  }


  return (
    <div>
      <div className='banner'>
        <h1 className='f1 white tc'>BeeShop</h1>

        <div className='mt3'>
          {isSignedIn
            ?
            <>
              <p className='f5 white tr pr5 mt2 mb2'>{`Signed in as ${user.firstName}`}</p>
              <p className='f5 white tr pr5 mt2 mb2 link underline pointer' onClick={() => onSignOut()}>Sign Out</p>
            </>
            :
            <p className='f5 white tr pr5 mt2 mb2 link underline pointer' onClick={() => onRouteChange(routes.SIGN_IN)}>Sign In</p>
          }
          <p className='f5 white tr pr5 mt3 mb2 link underline pointer' onClick={() => onRouteChange(routes.SHOP)}>Shop</p>
          <p className='f5 white tr pr5 mt2 mb2 link underline pointer' onClick={() => onRouteChange(routes.CART)}>Cart</p>

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

      {display}

      <footer>
        <div className='tc ba'>
          <h1 className='f4 white'>Footer</h1>
        </div>
      </footer>
    </div>
  );
}

export default App;
