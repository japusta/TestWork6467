'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/hooks/useCart';
import styles from '@/styles/Cart.module.scss';
import Image from 'next/image';

export default function CartPage() {
  // флаг, что мы уже на клиенте
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Берём корзину (изначально сервер видит [] — пусто)
  const items = useCart((s) => s.items);
  const totalPrice = useCart((s) => s.totalPrice());
  const { removeItem, addItem, clearCart } = useCart();

  return (
    <div className={styles.container}>
      {/* Заголовок — статично отдаётся и на сервере, и на клиенте */}
      <h1>Ваша корзина</h1>

      {/* Ниже — только после монтирования показываем содержимое */}
      {mounted && (
        <>
          {items.length === 0 ? (
            <p>Корзина пуста</p>
          ) : (
            <>
              <ul className={styles.list}>
                {items.map(({ product, quantity }) => (
                  <li key={product.id} className={styles.item}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className={styles.info}>
                      <h2>{product.title}</h2>
                      <p>Price: ${product.price.toFixed(2)}</p>
                      <p>Qty: {quantity}</p>
                      <div className={styles.controls}>
                        <button onClick={() => removeItem(product.id)}>-</button>
                        <button onClick={() => addItem(product)}>+</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className={styles.footer}>
                <span className={styles.total}>
                  Total: ${totalPrice.toFixed(2)}
                </span>
                <button
                  className={styles.clear}
                  onClick={() => clearCart()}
                >
                  Очистить корзину
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
