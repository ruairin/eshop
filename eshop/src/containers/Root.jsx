import { Outlet } from "react-router-dom";

import Banner from '../components/banner/Banner';
import Footer from '../components/footer/Footer';

import { getCategories, getProducts } from "../api/products";

export async function loader() {
  const products = await getProducts();
  const categories = await getCategories();

  return { products, categories };
}

const Root = () => {

  return (
    <>
      <Banner />
      <Outlet />
      <Footer />
    </>
  );
}

export default Root;
