/** 
 * Methods for Shop component
 * 
 * @module Shop
 * 
 */

import React from "react";
import { Link, Outlet, useParams, useRouteLoaderData } from "react-router-dom";

import './Shop.css';

/**
 * Generates the Shop component
 * The default component is ShopHome before a category is selected
 * Otherwise a ProductView or ProductGrid (for a given category) is displayed
 * 
 */

const Shop = () => {

  const params = useParams();
  const categoryId = params.categoryId ? Number(params.categoryId) : null;

  const { categories } = useRouteLoaderData('root');

  return (
    <>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-4 gap-6 grid-flow-col auto-cols-auto'>
          <div className='hidden sm:block nav-pane'>

            <h4 className='nav-font-bold py-2'>Navigation</h4>
            <Link title="Home" to={'/'}>
              <h4 className="py-2">Home</h4>
            </Link>
            <Link title="Fontend" to={'/about/frontend'}>
              <h4 className="py-2">Frontend</h4>
            </Link>
            <Link title="Fontend" to={'/about/backend'}>
              <h4 className="py-2">Backend</h4>
            </Link>
            <Link title="Database" to={'/about/db'}>
              <h4 className="py-2">Database</h4>
            </Link>
            <Link title="Shop" to={'/shop'}>
              <h4 className="py-2">Shop</h4>
            </Link>
            <ul>
              {
                categories.map((category) => {
                  let className = 'list-inside list-none py-1 pl-2';
                  if (category.id === categoryId) {
                    className += ' text-orange-600 font-bold';
                  }
                  return (<Link key={category.id} to={`category/${category.id}`}><li className={className}>{category.title}</li></Link>);
                })
              }
            </ul>
          </div>
          <div className='col-span-3 product-pane'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
