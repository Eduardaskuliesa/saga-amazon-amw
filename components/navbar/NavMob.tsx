/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { navLinks } from './navLinks';
import NavLink from './NavLink';
import ContactIcons from './ContactIcons';

const NavMob = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="md:hidden fixed top-0 right-0">
      <div
        onClick={() => setMenuOpen((prevSate) => !prevSate)}
        className="cursor-pointer absolute top-8 right-8 w-[45px] z-[10] "
      >

        <div
          className={`navMob-bar origin-center translate-y-[-5px] ${menuOpen
            ? 'open translate-y-[6px] rotate-[-45deg]' : ''}`}
        />
        <div
          className={`navMob-bar ${menuOpen ? 'open opacity-0' : ''}`}
        />
        <div
          className={`navMob-bar origin-center translate-y-[5px] ${menuOpen
            ? 'open translate-y-[-4px] rotate-[45deg]' : ''}`}
        />
      </div>
      <div className={`fixed-center  z-10 ${menuOpen ? '' : ''}`}>
        <div className={`flex-col justify-start items-center transition-all opacity-0 duration-700
                ${menuOpen ? 'navMob__animation--apear' : 'navMob__animation--dissapear hidden'}`}
        >
          <ul className={`text-2xl leading-[3rem] z-10 text-center flex flex-col text-white
                    min-[400px]:text-4xl min-[400px]:leading-[5rem]
                    `}
          >
            {
                            navLinks.map((link) => (
                              <NavLink onClick={setMenuOpen} href={link.href} label={link.label} key={`${link.label}mob`} className="nav-link inline-block relative uppercase after:bg-white hover:opacity-80 active:opacity-70" />
                            ))
                            }
          </ul>
          <div className="text-white mt-10 h-full flex justify-center items-center gap-1.5
                        min-[400px]:gap-5
                    "
          >
            <ContactIcons sizeMultiplyer={1.5} />
          </div>
        </div>
      </div>
      <div className={menuOpen
        ? 'navMob-bg w-10 h-10 bg-red-400 scale-[60] transition-all duration-700 ease-out'
        : 'navMob-bg w-1 h-1 transition-all duration-700 ease-in'}
      />

    </div>
  );
};

export default NavMob;
