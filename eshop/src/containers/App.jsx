/** 
 * The main page for App setup
 * 
 * @module App
 * 
 */


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root, { loader as rootLoader } from './Root';
import Cart, { loader as cartLoader, action as cartAction } from '../components/cart/Cart';
import SignIn from '../components/signin/SignIn';
import Register from '../components/register/Register';
import Home from '../components/Home';
import AboutFrontend from "../components/AboutFrontend";
import AboutBackend from "../components/AboutBackend";
import AboutDB from "../components/AboutDB";
import ErrorPage from '../components/ErrorPage';
import Shop from '../components/shop/Shop';
import ShopHome from '../components/shop/ShopHome';
import ProductGrid from "../components/shop/ProductGrid";
import ProductView, { action as productViewAction } from "../components/shop/ProductView";

import './App.css';


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
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
              path: 'about/frontend',
              element: <AboutFrontend />,
            },
            {
              path: 'about/backend',
              element: <AboutBackend />,
            },
            {
              path: 'about/db',
              element: <AboutDB />,
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
                  element: <ProductView />,
                  action: productViewAction
                },
              ]
            },
            {
              path: 'cart/',
              element: <Cart />,
              loader: cartLoader,
              action: cartAction,
            },
            {
              path: 'signIn/',
              element: <SignIn />,
              // action: signInAction,
            },
            {
              path: 'register/',
              element: <Register />
            }
          ]
        }
      ]
    }
  ],
    { basename: "/eshop/" });

  return (
    <RouterProvider router={router} />
  );
}

export default App;
