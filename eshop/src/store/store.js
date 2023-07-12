/** 
 * Methods for generating zustand store of app state.
 * The store consists of the user details (name, sign in status)
 * 
 * @module store
 * 
 */

import { create } from 'zustand';

const initialUser = {
  id: null,
  email: null,
  first_name: null,
  last_name: null
}

const user = (set) => ({
  user: initialUser,
  signed_in: false,

  // State update when user signs in
  signIn: (newUser) => {
    console.log(newUser);
    set((state) => ({
      ...state,
      user: newUser,
      signed_in: true
    }))
  },

  // State update when user signs out
  signOut: () => {
    set((state) => ({
      ...state,
      user: initialUser,
      signed_in: false
    }))
  }
});

export const userStore = create(user);


