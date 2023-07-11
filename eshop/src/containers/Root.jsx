import { Outlet } from "react-router-dom";

import Banner from '../components/banner/Banner';
import Footer from '../components/footer/Footer';

import { getCategories, getUsers, getLogin, getProducts } from "../api/api";

export async function loader() {
  const products = await getProducts();
  const categories = await getCategories();

  return { products, categories };
}

const Root = ({ onSignOut, isSignedIn, user, cart }) => {

  return (
    <>
      <Banner onSignOut={onSignOut} isSignedIn={isSignedIn} user={user} cart={cart} />
      {/* <NavBar /> */}
      <Outlet />
      <Footer />
    </>
  );
}

export default Root;
