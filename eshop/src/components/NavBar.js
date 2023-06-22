import React from "react";
import './NavBar.css';

const NavBar = ({ onRouteChange, routes, categories, onSelectCategory }) => {

  return (
    <div className='tc ba'>
      <div class="bg-black-90 w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
        <nav class="f6 fw6 ttu tracked">
          <a className="link dim white dib mr3" href="#" title="Home" onClick={() => onRouteChange(routes.HOME)}>Home</a>
          <a class="link dim white dib mr3" href="#" title="About" onClick={() => onRouteChange(routes.ABOUT)}>About</a>
          
          <div className="dropdown">
            <a class="link dim white dib mr3" href="#" title="Shop" onClick={() => onRouteChange(routes.SHOP_HOME)}>Shop</a>
            <div className='dropdown-content'>
              {
                categories.map((category) => {
                  return (
                    <a className="link dim white dib mr3" href="#" title={category.title} onClick={() => onSelectCategory(category.id)}>{category.title}</a>
                  );
                })
              }
            </div>
          </div>
          <a class="link dim white dib" href="#" title="Contact" onClick={() => onRouteChange(routes.CONTACT)}>Contact</a>
        </nav>
      </div>
    </div>
  );

}

export default NavBar;

