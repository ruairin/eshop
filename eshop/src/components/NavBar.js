import React from "react";
import { Link, useRouteLoaderData } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const { categories } = useRouteLoaderData('root');

  return (
    <div className='tc ba'>
      <div class="bg-black-90 w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
        <nav class="f6 fw6 ttu tracked">
          <Link class="link dim white dib mr3" href="#" title="Home" to={'/'} >Home</Link>
          <Link class="link dim white dib mr3" href="#" title="About" to={'/about/'} >About</Link>

          <div className="dropdown">
            <Link class="link dim white dib mr3" href="#" title="Shop" to={'/shop/'} >Shop</Link>
            <div className='dropdown-content'>
              {
                categories.map((category) => {
                  const { id } = category;
                  return (
                    <Link className="link dim white dib mr3" href="#" title={category.title} to={`/shop/category/${id}`}>{category.title}</Link>
                  );
                })
              }
            </div>
          </div>
          <Link class="link dim white dib mr3" href="#" title="Contact" to={'/contact/'} >Contact</Link>
        </nav>
      </div>
    </div>
  );

}

export default NavBar;

