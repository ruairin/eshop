import React from "react";

const Banner = ({ onRouteChange, onSignOut, isSignedIn, user, routes }) => {

  return (
    <div className='banner'>
      <h1 className='f1 white tc'>BeeShop</h1>

      <div className='mt3'>
        {isSignedIn
          ?
          <>
            <p className='f5 white tr pr5 mt2 mb2'>{`Signed in as ${user.firstName}`}</p>
            <p className='f5 white tr pr5 mt2 mb2 link underline pointer' onClick={() => onSignOut()}>Sign Out</p>
          </>
          :
          <p className='f5 white tr pr5 mt3 mb2 link underline pointer' onClick={() => onRouteChange(routes.SIGN_IN)}>Sign In</p>
        }
        <p className='f5 white tr pr5 mt2 mb2 link underline pointer' onClick={() => onRouteChange(routes.CART)}>Cart</p>

      </div>
    </div>
  );

}

export default Banner;