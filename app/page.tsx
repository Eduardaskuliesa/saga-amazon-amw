import React from 'react';
import './parralax.css';
import { Metadata } from 'next';
import AboutContainer from '@/components/parrallax/AboutContainer';
import ParralaxWrapper from '@/components/parrallax/ParralaxWrapper';

export const metadata: Metadata = {
  title: 'Home | Saga Backup',
  description: 'Geriausi eventai pajūryje!',
};

export const dynamic = 'force-static';

const Home = async () => (
  <main className="p-[0px]">
    <ParralaxWrapper />
    <article
      className="main-article"
    >
      <div className="simple-background" />
      <AboutContainer />
    </article>
  </main>

);
export default Home;
