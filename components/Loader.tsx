'use client';

import styles from '@/styles/Loader.module.scss';

export default function Loader() {
  return <div className={styles.spinner} aria-label="Loading" />;
}
