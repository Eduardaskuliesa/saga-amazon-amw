import { cookies } from 'next/headers';
import EventCard from './EventCard';

type Props = {
  events: EventDisplay[],
  isActive: boolean,
};

const EventList = ({ events, isActive }: Props) => {
  const isLoggedIn = cookies().get('saga-sessionToken');
  return (
    <div className="m-10 mt-20 items-center xl:ml-[22%] xl:items-baseline flex flex-col justify-center">
      <div>
        {
        events.map((event) => (
          <EventCard
            isLoggedIn={!!isLoggedIn}
            key={event._id}
            _id={event._id}
            name={event.name}
            date={event.date}
            location={event.location}
            locationLink={event.locationLink}
            ticketLink={event.ticketLink}
            djs={event.djs}
            isActive={isActive}
          />
        ))
        }
      </div>

    </div>
  );
};
export default EventList;
