'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import ThemeToggle from '@/components/ThemeToggle'
import styles from '@/styles/Header.module.scss'

export default function Header() {
  const { user, logout } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
  }

  const pages = [
    { href: '/', label: 'Home' },
    { href: '/hot-deals', label: 'Hot Deals' },
    { href: '/categories', label: 'Categories' },
    { href: '/laptops', label: 'Laptops' },
    { href: '/smartphones', label: 'Smartphones' },
    { href: '/cameras', label: 'Cameras' },
    { href: '/accessories', label: 'Accessories' },
  ]

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link
          href="/"
          className={styles.logo}
          onClick={() => setMenuOpen(false)}
        >
          Abelohost Shop.
        </Link>

        {/* навигация */}
        <nav className={styles.nav}>
          <ul>
            {pages.map((p) => (
              <li key={p.href}>
                <Link href={p.href}>{p.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* авторизация и корзина */}
        <div className={styles.auth}>
          {mounted && user ? (
            <>
              <span className={styles.userName}>
                {user.firstName} {user.lastName}
              </span>
              <button
                className={styles.logout}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className={styles.login}>
              Login
            </Link>
          )}
          <Link href="/cart" className={styles.cartLink}>
            Cart
            {mounted && (
              <span className={styles.badge}>{/* totalCount */}</span>
            )}
          </Link>
        </div>

        {/* контейнер темы и бургер */}
        <div className={styles.controls}>
          <ThemeToggle />

          <button
            className={styles.burger}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </button>
        </div>

        {/* мобильное меню */}
        {menuOpen && (
          <nav className={styles.mobileNav}>
            <ul>
              {pages.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    onClick={() => setMenuOpen(false)}
                  >
                    {p.label}
                  </Link>
                </li>
              ))}

              {mounted && !user && (
                <li>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
              )}

              {mounted && user && (
                <li>
                  <button
                    className={styles.logoutMobile}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              )}

              <li>
                <Link
                  href="/cart"
                  onClick={() => setMenuOpen(false)}
                >
                  Cart
                  <span className={styles.badge}>
                    {/* totalCount */}
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}
