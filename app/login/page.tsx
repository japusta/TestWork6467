'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Loader from '@/components/Loader';
import styles from '@/styles/Login.module.scss';

export default function LoginPage() {
  const router = useRouter();
  const { user, login, loading, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  // если уже залогинен то уходим на главную
  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (username.trim().length < 3 || password.trim().length < 3) {
      setFormError('Username и password должны быть не менее 3 символов');
      return;
    }

    try {
      await login(username.trim(), password.trim());
      // редирект в useEffect
    } catch {
      // сообщение ошибки будет в error из useAuth
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          disabled={loading}
        />

        {(formError || error) && <div className={styles.error}>{formError || error}</div>}

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? <Loader /> : 'Login'}
        </button>
      </form>
    </div>
  );
}
