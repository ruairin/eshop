import React, { useState } from 'react';

import Cart from '../components/Cart';
import SignIn from '../components/SignIn';
import Register from '../components/Register';
import Home from '../components/Home';
import About from '../components/About';
import Contact from '../components/Contact';
import Shop from '../components/Shop';
import ShopHome from '../components/ShopHome';
import ErrorPage from './ErrorPage';
import Root, { loader as rootLoader } from '../components/Root';
import ProductGrid from "../components/ProductGrid";
import ProductView from "../components/ProductView";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './App.css';
import 'tachyons';

function App() {

  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);

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

  const onSignIn = (user) => {
    loadUser(user);
    setIsSignedIn(true);
  }

  const onSignOut = () => {
    loadUser({});
    setIsSignedIn(false);
  }

  const onRegister = () => {
    loadUser({});
    setIsSignedIn(false);
  }

  const loadUser = (user) => {
    setUser({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    });
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root onSignOut={onSignOut} isSignedIn={isSignedIn} user={user} />,
      errorElement: <ErrorPage />,
      id: 'root',
      loader: rootLoader,
      children: [
        {
          // This causes the error element to display in the right pane (i.e. as a child of root)
          // Without this, you get the entire page as an error (i.e. the error element in root is rendered)
          errorElement: <ErrorPage />,
          children: [
            { index: true, element: <Home /> },
            {
              path: 'about/',
              element: <About />,
            },
            {
              path: 'contact/',
              element: <Contact />,
            },
            {
              path: 'shop/',
              element: < Shop />,
              children: [
                { index: true, element: <ShopHome /> },
                {
                  path: 'category/:categoryId/',
                  element: <ProductGrid />,
                },
                {
                  path: 'products/:productId/',
                  element: <ProductView onAddToCart={onAddToCart} />,
                },
              ]
            },
            {
              path: 'cart/',
              element: <Cart cart={cart} onDeleteFromCart={onDeleteFromCart} />,
            },
            {
              path: 'signIn/',
              element: <SignIn onSignIn={onSignIn} />,
            },
            {
              path: 'register/',
              element: <Register onRegister={onRegister} />
            }
          ]
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
