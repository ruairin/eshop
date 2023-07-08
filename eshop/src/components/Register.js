import React, { useState } from 'react';
import { useNavigate } from 'react-router';


// TODO: login, users to be removed when DB implemented
const Register = ({ onRegister, login, users }) => {

  const navigate = useNavigate();

  // States for getting values from input fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmitRegister = async () => {
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password,
          first_name: firstName,
          last_name: lastName,
        })
      });

      if (response.ok) {
        const userEntry = await response.json();
        if (userEntry) {
          onRegister();
        }
      } else {
        throw new Error(response.status);
      }
    } catch (error) {
      console.log("Error in sign in: ", error);
      window.alert('Error signing in')
    }
    navigate('/');
  }

  return (
    <div className='flex justify-center'>
      <article className="mt-8 w-full max-w-xs">
        <main className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <fieldset id="sign_up" className="">
              <legend className="page-title-font f2 fw6 ph0 mh0 center">Register</legend>
              <div className="mt-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">First Name</label>
                <input
                  onChange={e => setFirstName(e.target.value)}
                  className="shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-sky-700 focus:shadow-outline"
                  type="text"
                  name="firstName"
                  id="firstName"
                />
              </div>
              <div className="mt-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">Last Name</label>
                <input
                  onChange={e => setLastName(e.target.value)}
                  className="shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-sky-700 focus:shadow-outline"
                  type="text"
                  name="lastName"
                  id="lastName"
                />
              </div>
              <div className="mt3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email-address">Email</label>
                <input
                  onChange={e => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-sky-700 focus:shadow-outline"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={e => setPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-sky-700 focus:shadow-outline"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={() => handleSubmitRegister()}
                className="mt-6 px-4 py-4 rounded font-bold bg-orange-400 hover:bg-orange-600"
                type="submit"
                value="Register" />
            </div>
          </div>
        </main>
      </article>
    </div>
  );
}

export default Register;