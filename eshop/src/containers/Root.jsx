/** 
 * Methods for generating the Root page
 * 
 * @module Root
 * 
 */

import { Outlet } from "react-router-dom";

import Banner from '../components/banner/Banner';
import Footer from '../components/footer/Footer';

import { getCategories, getProducts } from "../api/products";

/**
 * react-router loader function for Root component
 * 
 */

export async function loader() {
  const products = await getProducts();
  const categories = await getCategories();

  return { products, categories };
}

/**
 * Generates the Root component
 * This is the overall layout of the page
 * (banner, content, footer)
 * 
 */

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
