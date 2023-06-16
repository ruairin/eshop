import React, { useState, useEffect } from 'react';


// TODO: login, users to be removed when DB implemented
const SignIn = ({ onSignIn, login, users }) => {

  // States for getting values from input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmitSignIn = (loginDB, usersDB) => {
    // Call load user from app.js
    console.log(email, password);

    const loginEntry = loginDB.find(entry => entry.email === email);
    console.log(loginEntry);
    if (loginEntry && loginEntry.hash === password) {
      const userEntry = usersDB.find(entry => entry.email === email);
      console.log(userEntry);
      if (userEntry) {
        onSignIn(userEntry);
      }
    } else {
      window.alert('Error signing in')
    }
  }

  return (
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0 center">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input
                onChange={e => setEmail(e.target.value)}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                onChange={e => setPassword(e.target.value)}
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={() => handleSubmitSignIn(login, users)}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in" />
          </div>
          {/* <div className="lh-copy mt3">
            <p onClick={() => onRouteChange('register')} href="#0" className="f6 link dim black db pointer">Register</p>
          </div> */}
        </div>
      </main>
    </article>
  );

}

export default SignIn;