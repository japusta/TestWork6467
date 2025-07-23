'use client';

import styles from '@/styles/SkeletonCard.module.scss';

export default function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={styles.image} />
      <div className={styles.info}>
        <div className={styles.line} style={{ width: '60%' }} />
        <div className={styles.line} style={{ width: '40%' }} />
        <div className={styles.line} style={{ width: '30%', marginTop: 'auto' }} />
      </div>
    </div>
  );
}
