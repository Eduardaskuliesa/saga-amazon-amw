/* eslint-disable react/function-component-definition */
import './globals.css';
import type { Metadata } from 'next';
import { Sedgwick_Ave_Display, Young_Serif, Poppins } from 'next/font/google';
import { cookies } from 'next/headers';
import NavBar from '../components/navbar/NavBar';
import Footer from '@/components/Footer';

const sedgwick = Sedgwick_Ave_Display({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  variable: '--font-sedgwick',
});

const young = Young_Serif({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  variable: '--font-young',
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700', '900'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Saga Backup',
  description: 'Geriausi eventai pajūryje!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = cookies().get('saga-sessionToken');

  return (
    <html
      lang="en"
      className={`${sedgwick.variable} ${young.variable} ${poppins.variable}`}
    >
      <head>
        <meta charSet="UTF-8" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Kalnia */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kalnia:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com"/>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
      </head>
      <body>
        <NavBar isLoggedIn={!!isLoggedIn} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
