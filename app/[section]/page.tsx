import Link from 'next/link';
import styles from '@/styles/SectionStub.module.scss';

interface SectionPageProps {
  params: { section: string };
}

export default function SectionPage({ params: { section } }: SectionPageProps) {
  const title = section
    .split('-')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>{title}</h1>
      <p className={styles.text}>Этот раздел пока в разработке.</p>
      <Link href="/" className={styles.back}>
        ← На главную
      </Link>
    </main>
  );
}
