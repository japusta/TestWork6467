// app/layout.tsx
import './globals.scss';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';

export const metadata = {
  title: 'Abelohost Shop',
  description: 'DummyJSON Shop with Next.js, TS, Zustand, Axios',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <ThemeProvider>

          <Header />

          {/* основной контент */}
          <main id="main-content">{children}</main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
