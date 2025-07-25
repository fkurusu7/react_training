import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import PageNav from '../components/PageNav';
import { useAuthApp } from '../contexts/AuthContext';
import styles from './Login.module.css';

export default function Login() {
  const navigate = useNavigate();

  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState('jack@example.com');
  const [password, setPassword] = useState('qwerty');

  const { signin, isAuthenticated } = useAuthApp();

  function handleSignin(ev) {
    ev.preventDefault();

    if (email && password) signin(email, password);
  }

  useEffect(() => {
    if (isAuthenticated) navigate('/app', { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSignin}>
        <div className={styles.row}>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            id='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type='primary'>Login</Button>
        </div>
      </form>
    </main>
  );
}
