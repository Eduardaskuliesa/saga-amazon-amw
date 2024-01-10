'use client';

import { useInView } from 'react-intersection-observer';

type Props = {
  children: React.ReactNode
  addClass?: string
};

const SecondaryHeader = ({ children = '', addClass }: Props) => {
  const [obsRef, inView] = useInView({
    threshold: 0,
    triggerOnce: true,

  });

  return (
    <h2
      ref={obsRef}
      className={` hyphens-auto tracking-widest text-stroke font-popins font-black uppercase
        duration-500 transition-all opacity-0 translate-y-[50px]
        ${inView ? 'animations-up' : ''}
        ${addClass}`}
    >
      {children}
    </h2>
  );
};

export default SecondaryHeader;
