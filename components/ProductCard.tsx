'use client';

import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { Product } from '@/lib/types';
import styles from '@/styles/ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { user } = useAuth();

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {/* используем <Imagе для оптимизации */}
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.category}>{product.category}</p>
        <p className={styles.price}>${product.price.toFixed(2)}</p>

        {user && (
          <button className={styles.addButton}>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}
