'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import NavLink from './navbar/NavLink';

const Footer = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname !== '/videos'
        ? (
          <footer
            className="z-100 text-xs min-[440px]:text-sm text-gray-400 w-full mb-2 sm:mb-3 mt-auto flex justify-between items-center hyphens-auto"
          >
            <div className="ml-2 sm:ml-5 flex flex-col">
              <span>
                Copyright &copy; 2023-
                {(new Date().getFullYear())}
                .&nbsp;
              </span>
              <span className="flex flex-col min-[400px]:block">
                All rights reserved by &nbsp;
                <span className="text-gray-200">
                  MB "Events by Saga"
                </span>
              </span>
            </div>
            <NavLink href="/contacts" label="Kontaktai" className="underline hover:text-red-400 duration-300 list-none mr-2 sm:mr-5" />
          </footer>
        )
        : ''}
    </>
  );
};

export default Footer;
