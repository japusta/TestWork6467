import './globals.scss';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Abelohost Shop',
  description: 'DummyJSON Shop with Next.js, TS, Zustand, Axios',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}