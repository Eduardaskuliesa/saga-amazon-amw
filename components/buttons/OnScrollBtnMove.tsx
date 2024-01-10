'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import BtnTicketRounded from './BtnTicketRounded';

type Props = {
  ticketLink: string
}

const OnScrollBtnMove = ({ ticketLink }: Props) => {
  const [outOfView, setOutOfView] = useState(false);

  const [obsRef, inView] = useInView({
    threshold: 0.1,
    initialInView: true,

  });

  useEffect(() => {
    if (!inView) setOutOfView(true);
  }, [inView]);

  return (
    <div
      ref={obsRef}
      className={!outOfView ? ''
        : 'toCorner-animation'}
    >
      <BtnTicketRounded isFilled={!outOfView} ticketLink={ticketLink} />
    </div>
  );
};

export default OnScrollBtnMove;
