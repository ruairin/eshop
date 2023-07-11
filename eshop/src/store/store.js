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

  signIn: (newUser) => {
    console.log(newUser);
    set((state) => ({
      ...state, 
      user: newUser, 
      signed_in: true
    }))
  },

  signOut: () => {
    set((state) => ({
      ...state, 
      user: initialUser, 
      signed_in: false
    }))
  }
});

export const userStore = create(user);


