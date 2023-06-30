import React from "react";
import { Link, Outlet, useParams, useRouteLoaderData } from "react-router-dom";

import './Shop.css';

const Shop = () => {

  const params = useParams();
  const categoryId = params.categoryId ? Number(params.categoryId) : null;

  const { categories } = useRouteLoaderData('root');

  return (
    <>
      <div className='flex-container'>
        <div className='flex-row'>
          <div className='nav-pane'>

            <h4 className='nav-font-bold py-2'>Navigation</h4>
            <Link title="Home" to={'/'}>
              <h4 className="py-2">Home</h4>
            </Link>
            <Link title="About" to={'/about'}>
              <h4 className="py-2">About</h4>
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
                  return (<Link to={`category/${category.id}`}><li className={className}>{category.title}</li></Link>);
                })
              }
            </ul>
            <Link title="Contact" to={'/contact'}>
              <h4 className="py-2">Contact</h4>
            </Link>
          </div>
          <div className='product-pane'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
