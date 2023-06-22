import React, { useState } from 'react';


// TODO: login, users to be removed when DB implemented
const Register = ({ onRegister, login, users }) => {

  // States for getting values from input fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmitRegister = (loginDB, usersDB) => {
    // Call load user from app.js
    console.log(firstName, lastName, email, password);

    // Check if already registered
    if (loginDB.find(entry => entry.email === email)) {
      window.alert('Email already registered');
    } else {
      let id = loginDB.length;
      usersDB.push(
        {
          id: id,
          email: email,
          firstName: firstName,
          lastName: lastName
        }
      );
      loginDB.push(
        {
          email: email,
          hash: password
        }
      );
      onRegister();
    }
  }

  return (
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0 center">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="firstName">First Name</label>
              <input
                onChange={e => setFirstName(e.target.value)}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="firstName"
                id="firstName"
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="lastName">Last Name</label>
              <input
                onChange={e => setLastName(e.target.value)}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="lastName"
                id="lastName"
              />
            </div>
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
              onClick={() => handleSubmitRegister(login, users)}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Register" />
          </div>
        </div>
      </main>
    </article>
  );
}

export default Register;