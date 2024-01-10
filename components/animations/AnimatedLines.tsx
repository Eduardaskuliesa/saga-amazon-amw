'use client';

import { useInView } from 'react-intersection-observer';

type Props = {
  lines: string[]
  containerClass?: string,

};

const AnimatedLines = ({ lines, containerClass }: Props) => {
  const [obsRef, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,

  });

  return (
    <div className={containerClass} ref={obsRef}>
      {lines.map((text, i) => (
        <p
          key={text + i}
          ref={obsRef}
          className={`${inView ? 'line-animations' : ''} opacity-0 text-shadow text-white p-2`}
          style={
                  {
                    animationDelay: `${i * 0.2}s`,
                    transform: 'translate(100vw) skew(-60deg)',
                  }
                }
        >
          {text !== ' ' ? text : '\u00A0' }
        </p>
      ))}
    </div>
  );
};

export default AnimatedLines;
