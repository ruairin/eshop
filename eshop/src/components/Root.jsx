import { Outlet } from "react-router-dom";

import NavBar from '../components/NavBar';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

import { getCategories, getUsers, getLogin, getProducts } from "../api";

export async function loader() {
  const products = getProducts();
  const categories = getCategories();
  const users = getUsers();
  const login = getLogin();

  return { products, categories, users, login };
}

const Root = ({ onRouteChange, onSignOut, isSignedIn, user, routes, categories, onSelectCategory }) => {
  return (
    <>
      <Banner onRouteChange={onRouteChange} onSignOut={onSignOut} isSignedIn={isSignedIn} user={user} routes={routes} />
      <NavBar onRouteChange={onRouteChange} routes={routes} categories={categories} onSelectCategory={onSelectCategory} />
      <Outlet />
      <Footer />
    </>
  );
}

export default Root;
