import React from "react";
import { Link, Outlet, useParams, useRouteLoaderData } from "react-router-dom";

import './Shop.css';
import 'tachyons';

const Shop = () => {

  const params = useParams();
  const categoryId = params.categoryId ? Number(params.categoryId) : null;

  const { categories } = useRouteLoaderData('root');

  return (
    <>
      <div className='flex-container'>
        <div className='flex-row'>
          <div className='nav-pane'>

            <h3>Navigation</h3>
            <Link title="Home" to={'/'}>
              <h4>Home</h4>
            </Link>
            <Link title="About" to={'/about'}>
              <h4>About</h4>
            </Link>
            <Link title="Shop" to={'/shop'}>
              <h4>Shop</h4>
            </Link>
            <ul>
              {
                categories.map((category) => {
                  let className = '';
                  if (category.id === categoryId) {
                    className = 'white';
                  }
                  return (<Link to={`category/${category.id}`}><li className={className}>{category.title}</li></Link>);
                })
              }
            </ul>
            <Link title="Contact" to={'/contact'}>
              <h4>Contact</h4>
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
