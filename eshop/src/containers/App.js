import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import 'tachyons';

import ProductGrid from '../components/ProductGrid';
import ProductView from '../components/ProductView';
import Cart from '../components/Cart';
import SignIn from '../components/SignIn';
import Register from '../components/Register';
import Home from '../components/Home';
import About from '../components/About';
import Contact from '../components/Contact';
import NavBar from '../components/NavBar';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import ProductCategories from '../components/Shop';


// ======= DB Placeholders =========
const temp = [...Array(60).keys()];
const products = temp.map((item, index) => {

  let category_id = 0;
  let image = '300.jpg';
  if (index >= 20 && index < 40){
    category_id = 1;
    image = 'icons8-puffin-bird-96.png';
  } else if (index >= 40) {
    category_id = 2;
    image = 'icons8-bee-swarm-96.png';
  }

  return (
    {
      id: `${item}`,
      title: `Product ${item + 1}`,
      price: 2.99,
      description: `This is product ${item + 1}`,
      prod_code: `SKU001 ${item + 1}`,
      image: image,
      inventory: 100,
      category_id: category_id,
    }
  );
});
console.log(products);


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

const categories = [
  {id: 0, title: 'Category 1', description: 'Description text for category 1', image: '300.jpg'},
  {id: 1, title: 'Category 2', description: 'Description text for category 2', image: 'icons8-puffin-bird-96.png'},
  {id: 2, title: 'Category 3', description: 'Description text for category 3', image: 'icons8-bee-swarm-96.png'},
]

// ======= /DB Placeholders =========

const routes = Object.freeze({
  SHOP_HOME: 'SHOP_HOME',
  SHOP_GRID: 'SHOP_GRID',
  SHOP_PRODUCT: 'SHOP_PRODUCT',
  CART: 'CART',
  SIGN_IN: 'SIGN_IN',
  REGISTER: 'REGISTER',
  HOME: 'HOME',
  ABOUT: 'ABOUT',
  CONTACT: 'CONTACT'
});

function App() {

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [route, setRoute] = useState(routes.SHOP_HOME);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);

  const onSelectProduct = (id) => {
    // console.log(id);
    setSelectedProduct(id);
    onRouteChange(routes.SHOP_PRODUCT);
  }

  const onSelectCategory = (id) => {
    // console.log(id);
    setSelectedCategory(id);
    onRouteChange(routes.SHOP_GRID);
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
    setRoute(routes.HOME);
  }

  const onSignOut = () => {
    loadUser({});
    setIsSignedIn(false);
    setRoute(routes.HOME);
  }

  const onRegister = () => {
    loadUser({});
    setIsSignedIn(false);
    setRoute(routes.SIGN_IN);
    console.log(users);
  }

  const loadUser = (user) => {
    setUser({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    });
  }

  // Logic for routing
  let display = null;
  switch (route) {
    case (routes.SHOP_HOME):
      display = <ProductCategories categories={categories}  onSelectCategory={onSelectCategory} />
      break;
    case (routes.SHOP_GRID):
      display = <ProductGrid products={products} categories={categories} categoryId={selectedCategory} onSelectProduct={onSelectProduct} />
      break;
    case (routes.SHOP_PRODUCT):
      display = <ProductView product={products[selectedProduct]} onSelectProduct={onSelectProduct} onAddToCart={onAddToCart} />
      break;
    case (routes.CART):
      display = <Cart cart={cart} products={products} onDeleteFromCart={onDeleteFromCart} />
      break;
    case (routes.SIGN_IN):
      display = <SignIn onSignIn={onSignIn} onRouteChange={onRouteChange} login={login} users={users} />
      break;
    case (routes.REGISTER):
      display = <Register onRegister={onRegister} login={login} users={users} />
      break;
    case (routes.HOME):
      display = <Home />
      break;
    case (routes.ABOUT):
      display = <About />
      break;
    case (routes.CONTACT):
      display = <Contact />
      break;
    default:
      display = <Home />
  }


  return (
    <div>
      <Banner onRouteChange={onRouteChange} onSignOut={onSignOut} isSignedIn={isSignedIn} user={user} routes={routes} />
      <NavBar onRouteChange={onRouteChange} routes={routes} categories={categories} onSelectCategory={onSelectCategory} />
      {display}
      <Footer />
    </div>
  );
}

export default App;
