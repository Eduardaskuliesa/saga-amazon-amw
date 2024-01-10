/* eslint-disable react/react-in-jsx-scope */

'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { animatePageOut } from '../animations/PageTransition';

type Props = {
  href: string,
  label?: string,
  className?: string,
  children?:React.ReactNode,
  onClick?: Dispatch<SetStateAction<boolean>>,
};

const NavLink = ({
  href,
  className = '',
  label,
  children,
  onClick,

}: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    animatePageOut(href, router);
    if (onClick != undefined) {
      onClick(false);
    }
  };

  return (
    <div className="cursor-pointer" onClick={pathname === href ? undefined : handleClick}>
      <li className={`list-none ${className} ${href === pathname ? 'activeLink' : ''}`}>
        {label}
        {children}
      </li>
    </div>
  );
};

export default NavLink;
