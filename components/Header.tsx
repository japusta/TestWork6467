'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import styles from '@/styles/Header.module.scss';

export default function Header() {
  const { user, logout } = useAuth();

  // aлаг, что мы уже на клиенте
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* логотип */}
        <Link href="/" className={styles.logo}>
          Abelohost Shop.
        </Link>

        {/* навигация */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <Link href="/" className={styles.navLink}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/hot-deals" className={styles.navLink}>
                Hot Deals
              </Link>
            </li>
            <li>
              <Link href="/categories" className={styles.navLink}>
                Categories
              </Link>
            </li>
            <li>
              <Link href="/laptops" className={styles.navLink}>
                Laptops
              </Link>
            </li>
            <li>
              <Link href="/smartphones" className={styles.navLink}>
                Smartphones
              </Link>
            </li>
            <li>
              <Link href="/cameras" className={styles.navLink}>
                Cameras
              </Link>
            </li>
            <li>
              <Link href="/accessories" className={styles.navLink}>
                Accessories
              </Link>
            </li>
          </ul>
        </nav>

        {/* авторизация */}
        <div className={styles.auth}>
          {/*
            до того, как mounted === true, рендерим точно то же,
            что на сервере - ссылку Login
          */}
          {!mounted ? (
            <Link href="/login" className={styles.login}>
              Login
            </Link>
          ) : user ? (
            <>
              <span className={styles.userName}>
                {user.firstName} {user.lastName}
              </span>
              <button className={styles.logout} onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className={styles.login}>
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
