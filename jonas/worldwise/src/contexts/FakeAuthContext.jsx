/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

const REDUCER_ACTION_TYPES = {
  Signin: 'signin',
  Signout: 'signout',
  Unknown: 'Unknown action type',
};

const initialState = {
  user: null,
  isAuthenticated: false,
};

function authReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case REDUCER_ACTION_TYPES.Signin:
      return { ...state, user: payload, isAuthenticated: true };

    case REDUCER_ACTION_TYPES.Signout:
      return { ...state, user: null, isAuthenticated: false };

    default:
      throw new Error(REDUCER_ACTION_TYPES.Unknown);
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { user, isAuthenticated } = state;

  function signin(email, password) {
    console.log(email, password);
    if ((email = FAKE_USER.email && password === FAKE_USER.password)) {
      dispatch({ type: REDUCER_ACTION_TYPES.Signin, payload: FAKE_USER });
    }
  }

  function signout() {
    dispatch({ type: REDUCER_ACTION_TYPES.Signout });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error('AuthContext was used outside of AuthProvider');

  return context;
}

export { AuthProvider, useAuth };
