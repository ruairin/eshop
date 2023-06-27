import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Banner = ({ onRouteChange, onSignOut, isSignedIn, user, routes }) => {

  const navigate = useNavigate();

  return (
    <div className='banner'>
      <h1 className='f1 white tc'>BeeShop</h1>

      <div className='mt3'>
        {isSignedIn
          ?
          <>
            <p className='f5 white tr pr5 mt2 mb2'>{`Signed in as ${user.firstName}`}</p>
            <p className='f5 white tr pr5 mt2 mb2 link underline pointer' onClick={() => {onSignOut();  navigate('/');}}>Sign Out</p>
          </>
          :
          <Link to={'signIn/'}>
            <p className='f5 white tr pr5 mt3 mb2 link underline pointer'>Sign In</p>
          </Link>
        }
        <Link to={'cart/'}>
          <p className='f5 white tr pr5 mt2 mb2 link underline pointer' >Cart</p>
        </Link>

      </div>
    </div>
  );

}

export default Banner;