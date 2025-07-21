'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Product, ProductsResponse } from '@/lib/types';
import Loader from '@/components/Loader';
import ProductCard from '@/components/ProductCard';
import styles from '@/styles/Home.module.scss';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get<ProductsResponse>('/products', {
          params: { limit: 12 },
        });
        setProducts(data.products);
      } catch (err: any) {
        setError('Не удалось загрузить товары');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className={styles.center}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.center}>
        <p className={styles.error}>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Latest Products</h1>
      <div className={styles.grid}>
        {products.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
}
