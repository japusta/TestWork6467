// components/ThemeToggle.tsx
'use client';

import { useTheme } from '@/hooks/useTheme';
import { useState, useEffect } from 'react';
import styles from '@/styles/ThemeToggle.module.scss';

export default function ThemeToggle() {
  const theme = useTheme((s) => s.theme);
  const toggle = useTheme((s) => s.toggle);

  // флаг монтирования (на сервере и до гидрации — false)
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // до монтирования не рендерим никакой иконки
  if (!mounted) {
    return null;
  }

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={`Переключить на ${theme === 'light' ? 'тёмную' : 'светлую'} тему`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
