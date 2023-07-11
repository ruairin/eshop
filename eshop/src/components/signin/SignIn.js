import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";


// Note: The following action function was intended to work with the form data
// that is recieved when the <Form> is submitted below. however there seems to be 
// no way to update the state of the app (i.e. call onSignIn())

// export async function action({ request, params }) {
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);
//   // const navigate = useNavigate();
//   // console.log(params);

//   try {
//     const response = await fetch('http://localhost:3000/signin', {
//       method: 'post',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         email: data.email_address,
//         password: data.password,
//       })
//     });

//     if (response.ok) {
//       const userEntry = await response.json();
//       console.log(userEntry);
//       if (userEntry) {
//         return userEntry;
//       }
//     } else {
//       throw new Error(response.status);
//     }
//   } catch (error) {
//     console.log("Error in sign in: ", error);
//     window.alert('Error signing in')
//   }

//   console.log(formData);
//   return null;
// }

const SignIn = ({ onSignIn }) => {

  const navigate = useNavigate();

  // const { users, login } = useRouteLoaderData('root');

  // States for getting values from input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmitSignIn = async () => {

    try {
      const response = await fetch('http://localhost:3000/signin', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: email,
          password: password,
        })
      });

      if (response.ok) {
        const userEntry = await response.json();
        if (userEntry) {
          onSignIn(userEntry);
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
    // <Form method='post' id='sign-in-form'>
    <div className='flex justify-center'>
      <article className="mt-8 w-full max-w-xs">
        <main className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <fieldset id="sign_up" className="">
              <legend className="page-title-font f2 fw6 ph0 mh0 center">Sign In</legend>
              <div className="mt-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email-address">Email</label>
                <input
                  onChange={e => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-sky-700 focus:shadow-outline"
                  type="email"
                  name="email_address"
                  id="email_address"
                />
              </div>
              <div className="mt-3">
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
                onClick={() => handleSubmitSignIn()}
                className="mt-6 px-4 py-4 rounded font-bold bg-orange-400 hover:bg-orange-600"
                type="submit"
                value="Sign in" />
            </div>
            <div className="lh-copy mt3">
              <Link to={'/register'}>
                <p href="#0" className="mt-3 text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">Register</p>
              </Link>
            </div>
          </div>
        </main>
      </article>
    </div>
    // </Form>
  );

}

export default SignIn;