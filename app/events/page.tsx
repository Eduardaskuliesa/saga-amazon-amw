import Link from 'next/link';
import { cookies } from 'next/headers';
import { Metadata } from 'next';
import DjForm from '@/components/events/DjForm';
import EventForm from '@/components/events/EventForm';
import EventList from '@/components/events/EventList';
import PopUp from '@/components/PopUp';
import { getAllEvents } from '@/services/server/events';
import DjDel from '@/components/events/DjDel';
import { getAllDjs } from '@/services/server/djs';
import SecondaryHeader from '@/components/typography/SecondaryHeader';

export const metadata: Metadata = {
  title: 'Eventai | Saga Backup',
  description: 'Geriausi eventai pajūryje!',
};
export const dynamic = 'force-dynamic'


type Props = {
  searchParams: Record<string, string> | null | undefined,
};

const Events = async ({ searchParams }: Props) => {
  let djs = [] as Dj[];
  const showEventForm = searchParams?.eventForm;
  const showDjForm = searchParams?.djForm;
  const showDeleteDj = searchParams?.deleteDj;
  const isLoggedIn = cookies().get('saga-sessionToken');
  const events = await getAllEvents() as AllEvents;
  if (isLoggedIn) {
    djs = await getAllDjs() as Dj[];
  }

  return (
    <main className="flex flex-col justify-center items-center xl:items-stretch min-h-screen">
      {isLoggedIn
        && (
        <>
          <div className="flex flex-wrap justify-center items-center gap-5 my-5">
            {djs.length > 0
            && (
            <Link
              href="/events?eventForm=true"
              className=" bg-green-400 hover:bg-transparent text-white font-semibold hover:text-green-400 py-2 px-4 border border-green-400 duration-300 rounded"
            >
              Kurti Eventa
            </Link>
            )}

            <Link
              href="/events?djForm=true"
              className=" bg-blue-400 hover:bg-transparent text-white font-semibold hover:text-blue-400 py-2 px-4 border border-blue-400 duration-300 rounded"
            >
              Kurti Dj
            </Link>
            {djs.length > 0
            && (
            <Link
              href="/events?deleteDj=true"
              className=" bg-red-400 hover:bg-transparent text-white font-semibold hover:text-red-400 py-2 px-4 border border-red-400 duration-300 rounded"
            >
              Trinti Dj
            </Link>
            )}
          </div>

          {showEventForm && djs.length > 0
            && (
            <PopUp closeLink="/events">
              <EventForm djs={djs} />
            </PopUp>
            )}
          {showDjForm
            && (
            <PopUp closeLink="/events">
              <DjForm />
            </PopUp>
            )}
            {showDeleteDj && djs.length > 0
            && (
            <PopUp closeLink="/events">
              <DjDel djs={djs} />
            </PopUp>
            )}
        </>
        )}
      {events?.newEvents.length > 0
        && (
        <>
          <SecondaryHeader addClass="text-5xl lg:text-7xl ml-0 xl:ml-60">
            Artejantis
          </SecondaryHeader>
          <EventList isActive={true} events={events.newEvents} />
        </>
        )}
      {events?.oldEvents.length > 0
      && (
      <>
        <SecondaryHeader addClass="text-5xl lg:text-7xl ml-0 xl:ml-60 mt-40">
          Praeja
        </SecondaryHeader>
        <EventList isActive={false} events={events.oldEvents} />
      </>
      )}

    </main>
  );
};

export default Events;
