import { AUTH_URI } from '../types/constants';

interface SignInProps {
  email: string;
  password: string;
}
export async function signinAPI(credentials: SignInProps): Promise<void> {
  const { email, password } = credentials;
  console.log('email', email);
  console.log('password', password);

  try {
    const response = await fetch(AUTH_URI, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Error signing in');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getCurrentUserApi() {
  // TODO: Get user from cookies? session? localStorage?
  // if(!user) return null
  // return user

  return null;
}

export async function signoutApi() {
  // TODO: implement sign out functionality
}
