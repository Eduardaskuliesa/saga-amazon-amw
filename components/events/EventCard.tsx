'use client';

import { useInView } from 'react-intersection-observer';
import BtnTicketSimple from '../buttons/BtnTicketSimple';
import BtnDelEvent from '../buttons/BtnDelEvent';
import BtnEdit from '../buttons/BtnEdit';
import { dateTimeToDisplay } from '@/lib/stringFormaters';
import NavLink from '../navbar/NavLink';

type Props = EventDisplay & {
  isLoggedIn: boolean,
  isActive: boolean,
};

const EventCard = ({
  _id,
  name,
  date,
  location,
  locationLink,
  ticketLink,
  djs,
  isLoggedIn,
  isActive,
}: Props) => {
  const [obsRef, inView] = useInView({
    threshold: 0,
    triggerOnce: true,

  });

  return (
    <div
      ref={obsRef}
      className={`mb-20 flex-col justify-center items-center font-popins font-black opacity-0
    ${inView ? 'animations-up' : ''}`}
      style={{
        animationDelay: '.5s',
      }}
    >
      <NavLink href={`/events/${_id}`}>
        <h3 className="text-3xl text-center sm:text-left sm:text-4xl md:text-5xl lg:text-6xl text-shadow mb-1 text-red-400 hover:text-stroke uppercase">
          {`${name} ${dateTimeToDisplay(date)}`}
        </h3>
      </NavLink>

      <div className="w-full flex justify-center items-center text-center sm:justify-normal">
        <a
          href={locationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-1xl sm:text-2xl md:text-3xl lg:text-4xl text-white hover:text-gray-500 transition-colors duration-300 ease-in-out font-dela "
        >
          {location}
        </a>
      </div>
      <div className="mt-3 flex flex-col-reverse justify-center items-center sm:justify-normal sm:mt-6 sm:flex-row ">
        {isActive
        && <BtnTicketSimple ticket={ticketLink} />}
        <div className="flex flex-wrap justify-center items-center">
          {djs && djs.map((dj) => (
            <p key={dj._id + _id} className="text-sm lg:text-base mr-3 text-white font-grafiti">
              {dj.name}
            </p>
          ))}
        </div>

      </div>
      {isLoggedIn
        && (
        <div className="ml-auto flex items-center justify-center mt-5">
          <BtnDelEvent id={_id} name={name} />
          <BtnEdit hrefOpen={`events/${_id}/?eventEdit=true`} />
        </div>
        )}
    </div>
  );
};

export default EventCard;
