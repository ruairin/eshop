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


export async function signOut() {
  await fetch(process.env.REACT_APP_API_URL + '/signout', {
    method: "GET",
    credentials: "include",
  });
}

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
  } catch (error) {
    return error;
  }
}