/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const authInitialState = {
  user: null,
  isAuthenticated: false,
};

const ACTION_TYPES = {
  Signin: 'signin',
  Signout: 'signout',
};

function authReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.Signin:
      return { ...state, user: payload, isAuthenticated: true };
    case ACTION_TYPES.Signout:
      // return { ...authInitialState };
      return { ...state, user: null, isAuthenticated: false };

    default:
      throw new Error('Unkown action type');
  }
}

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};
function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, authInitialState);
  const { user, isAuthenticated } = state;

  function signin(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: ACTION_TYPES.Signin, payload: FAKE_USER });
    }
  }

  function signout() {
    dispatch({ type: ACTION_TYPES.Signout });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuthApp() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error('AuthContext was used outside AuthProvider');

  return context;
}

export { AuthProvider, useAuthApp };
