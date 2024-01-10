/* eslint-disable react/function-component-definition */
import type { Metadata } from 'next';
import BackgroundVideo from '@/components/BackgroundVideo';

export const metadata: Metadata = {
  title: 'Events | Saga Backup',
  description: 'Visi - seni ir nauji eventai!',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BackgroundVideo />
      {children}
    </>
  );
}
