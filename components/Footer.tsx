'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import styles from '@/styles/Footer.module.scss';

export default function Footer() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  // устанавливаем mounted = true только на клиенте
  useEffect(() => {
    setMounted(true);
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* всегда рендерим © год на сервере и при первой отрисовке клиента */}
        <span>© {year}</span>

        {mounted && user && (
          <span className={styles.logged}>
            Logged as {user.email}
          </span>
        )}
      </div>
    </footer>
  );
}
