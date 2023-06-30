import React from "react";
import { Link, useNavigate, useRouteLoaderData } from "react-router-dom";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import Tooltip from '@mui/material/Tooltip';

import './Banner.css';

const Banner = ({ onSignOut, isSignedIn, user, cart }) => {

  const navigate = useNavigate();
  const { categories } = useRouteLoaderData('root');

  return (
    <div className='z-50 w-full h-30 bg-[#FF9E1B] border-b-[1px] z-index-1 sticky top-0 border-b-gray-500 font-titleFont py-6'>
      <div className='max-w-screen-xl h-full mx-auto flex items-center justify-between'>
        <Link to='/'>
          <h1 className="banner-title-font">e-Shop</h1>
        </Link>

        <div className='flex gap-5 items-center'>
          <ul className='flex items-center gap-8 cursor-pointer'>

          <Link class="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300" href="#" title="Home" to={'/'} >Home</Link>
          <Link class="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300" href="#" title="About" to={'/about/'} >About</Link>

          <div className="dropdown">
            <Link class="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300" href="#" title="Shop" to={'/shop/'} >Shop</Link>
            <div className='dropdown-content'>
              {
                categories.map((category) => {
                  const { id } = category;
                  return (
                    <Link className="link dim dib mr3" href="#" title={category.title} to={`/shop/category/${id}`}>{category.title}</Link>
                  );
                })
              }
            </div>
          </div>
          <Link class="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300" href="#" title="Contact" to={'/contact/'} >Contact</Link>
            {isSignedIn
              ?
              <>
                <div className='text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'
                  onClick={() => { onSignOut(); navigate('/')}}
                  >
                  <Tooltip title={`Signed in as ${user.firstName}. Click to Sign Out`}>
                    <Badge badgeContent={"\u2713"} color="success">
                      <PersonIcon fontSize="large" />
                    </Badge>
                  </Tooltip>
                </div>
              </>
              :
              <Link to={'signIn/'}>
                {/* <p className='f5 tr pr5 mt3 mb2 link underline pointer'>Sign In</p> */}
                <div className='text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>
                  <Tooltip title="Sign In">
                    <PersonIcon fontSize="large" />
                  </Tooltip>
                </div>
              </Link>
            }
            <Link to={'cart/'}>
              <Tooltip title="Go to Cart">
                <Badge badgeContent={cart.length} color="success">
                  <div className='text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>
                    <ShoppingCartIcon fontSize="large" />
                  </div>
                </Badge>
              </Tooltip>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );

}

export default Banner;