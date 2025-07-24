'use client';

import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/lib/types';
import { useState, useEffect } from 'react';
import styles from '@/styles/ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { user } = useAuth();
  const addItem = useCart((state) => state.addItem);

  // Флаг монтирования , до гидрации кнопки нет
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
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

        {mounted && user && (
          <button
            type="button"
            className={styles.addButton}
            onClick={handleAddToCart}
            aria-label={`Добавить ${product.title} в корзину`}
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}
