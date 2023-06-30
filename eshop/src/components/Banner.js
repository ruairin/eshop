import React from "react";
import { Link, useNavigate, useRouteLoaderData } from "react-router-dom";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import './Banner.css';

const Banner = ({ onSignOut, isSignedIn, user, cart }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const { categories } = useRouteLoaderData('root');

  return (

    <div className='bg-[#FF9E1B] border-b-[1px] sticky top-0 border-b-gray-500 font-titleFont py-1 px-3 sm:py-6 sm:px-6'>
      <div className="container mx-auto ">

        <div className='grid grid-cols-3 sm:grid-cols-2'>
          {/* Empty column so that the middle colums is centered */}
          <div className='sm:hidden'>

          </div>

          <div className='text-center sm:text-left'>
            <Link to='/'>
              <h1 className="banner-title-font sm:text-[50px]">e-Shop</h1>
            </Link>
          </div>

          <div className='justify-self-end self-center'>

            {/* dropdown menu - visible on small screens only */}
            <div className='sm:hidden'>
              <MenuIcon
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
              </MenuIcon>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose}>
                  <Link href="#" title="Home" to={'/'} >Home</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link href="#" title="About" to={'/about/'} >About</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link href="#" title="Shop" to={'/shop/'} >Shop</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link href="#" title="Contact" to={'/contact/'} >Contact</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  {isSignedIn
                    ?
                    <>
                      <div className='text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'
                        onClick={() => { onSignOut(); navigate('/') }}
                      >
                        <Tooltip title={`Signed in as ${user.firstName}. Click to Sign Out`}>
                          <Badge badgeContent={"\u2713"} color="success">
                            <PersonIcon fontSize="medium" />
                          </Badge>
                        </Tooltip>
                      </div>
                    </>
                    :
                    <Link to={'signIn/'}>
                      {/* <p className='f5 tr pr5 mt3 mb2 link underline pointer'>Sign In</p> */}
                      <div className='text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>
                        <Tooltip title="Sign In">
                          <PersonIcon fontSize="medium" />
                        </Tooltip>
                      </div>
                    </Link>
                  }
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to={'cart/'}>
                    <Tooltip title="Go to Cart">
                      <Badge badgeContent={cart.length} color="success">
                        <div className='text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>
                          <ShoppingCartIcon fontSize="" />
                        </div>
                      </Badge>
                    </Tooltip>
                  </Link>
                </MenuItem>
              </Menu>
            </div>

            {/* inline menu - visible on greater than sm */}
            <div className='hidden sm:block flex gap-5 items-center'>
              <ul className='flex items-center gap-4 cursor-pointer'>

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
                      onClick={() => { onSignOut(); navigate('/') }}
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
      </div>
    </div>
  );
}

export default Banner;