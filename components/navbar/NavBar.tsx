'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import NavLink from './NavLink';
import useScrollPixels from '@/hooks/useScrollPixels';
import HoverAnimation from '../HoverAnimation';
import BtnLogOut from '../buttons/BtnLogOut';
import NavMob from './NavMob';
import { navLinks } from './navLinks';
import ContactIcons from './ContactIcons';

type Props = {
  isLoggedIn: boolean
};

const NavBar = ({ isLoggedIn }: Props) => {
  const scrollPosition = useScrollPixels();
  const [navTop, setNavTop] = useState(true);

  useEffect(() => {
    if (navTop && scrollPosition > 150) {
      setNavTop(false);
    } else if (!navTop && scrollPosition < 150) {
      setNavTop(true);
    }
  }, [scrollPosition]);

  return (
    <nav className="fixed top-0 z-[100] w-full h-36 bg-transparent flex flex-col justify-center items-end">
      <div className="relative flex sm:items-center sm:justify-between h-full w-full px-4 2xl:px-16 font-roboto font-bold ">

        <HoverAnimation animationClass="nav-logo">
          <Link href="/">
            <Image
              alt="Logo"
              src="/logo.jpg"
              width="80"
              height="80"
              className="cursor-pointer mt-4 sm:mt-0 w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] rounded-full hover:opacity-90"
              priority
            />
          </Link>
        </HoverAnimation>

        <ul className={`hidden md:text-lg lg:text-2xl md:flex  ${navTop ? 'nav-top-appear' : 'nav-top-dissappear'} text-white`}>
          {
              navLinks.map((link) => (
                <NavLink href={link.href} label={link.label} key={`${link.label}top`} className="nav-link inline-block relative ml-5 lg:ml-10 uppercase hover:opacity-80" />
              ))
            }
        </ul>

        <ul className={`hidden fixed text-base lg:text-xl ${navTop ? 'nav-side-dissappear' : 'nav-side-appear'} top-1/3 right-0 md:flex flex-col items-end mr-5 text-white`}>
          {
              navLinks.map((link) => (
                <NavLink href={link.href} label={link.label} key={`${link.label}side`} className="nav-link inline-block relative mb-4 uppercase hover:opacity-80" />
              ))
            }
        </ul>
        <div className="hidden text-white ml-3 md:flex justify-between items-center gap-3 ">
          <ContactIcons iconClass="contact__icon--shadown" />
        </div>

        <NavMob />

      </div>
      {isLoggedIn
            && <BtnLogOut />}
    </nav>
  );
};
export default NavBar;
