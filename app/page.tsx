// app/page.tsx
import { Product, ProductsResponse } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import styles from '@/styles/Home.module.scss';

async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://dummyjson.com/products?limit=12', {
    // если ISR:
    // next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error('Не удалось получить товары');
  }
  const { products } = (await res.json()) as ProductsResponse;
  return products;
}

export default async function HomePage() {
  let products: Product[];

  try {
    products = await getProducts();
  } catch (err) {
    return (
      <div className={styles.center}>
        <p className={styles.error}>Не удалось загрузить товары</p>
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
