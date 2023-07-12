/** 
 * Methods performing API calls related to user accounts
 * 
 * @module api/account 
 * 
 */

/**
 * Submits sign in request to the server
 * 
 * @param {string} email    The user's email
 * @param {string} password The user's password
 * 
 * @typedef {Object} user
 * @property {string} id          The user's id
 * @property {string} email       The user's email
 * @property {string} first_name  The user's first name
 * @property {string} last_name   The user's last name
 * 
 * @returns {user}  User information on successful sign in
 * @throws {Error}  If an error occurred during request. 
 *                  Error.message contains the http response code
 */

export async function signIn(email, password) {

  try {
    const response = await fetch(process.env.REACT_APP_API_URL + '/signin', {
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
      return userEntry;
    }
    throw new Error(response.status);
  } catch (error) {
    return error;
  }
}

/**
 * Submits sign out request to the server
 * 
 * @returns {Number} Returns 0 on successful sign out
 * @throws {Error} If an error occurred during request. 
 *                 Error.message contains the http response code
 */

export async function signOut() {
  const response = await fetch(process.env.REACT_APP_API_URL + '/signout', {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(response.status);
  }
  return 0;
}

/**
 * Submits register to the server
 * 
 * @param {string} email    The user's email
 * @param {string} password The user's password
 * @param {string} firstName The user's first name
 * @param {string} lastName The user's last name
 * 
 * @returns {Number} Returns 0 if register was successful
 * @throws {Error}  If an error occurred during request. 
 *                  Error.message contains the http response code
 */

export async function register(email, password, firstName, lastName) {

  try {
    const response = await fetch(process.env.REACT_APP_API_URL + '/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
      })
    });

    if (!response.ok) {
      throw new Error(response.status);
    }
    return 0;
  } catch (error) {
    return error;
  }
}