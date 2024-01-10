import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { FaLocationDot } from 'react-icons/fa6';
import { getAllEvents, getEvent } from '@/services/server/events';
import PopUp from '@/components/PopUp';
import EventForm from '@/components/events/EventForm';
import { dateTimeToDisplay } from '@/lib/stringFormaters';
import DjList from '@/components/events/DjList';
import AnimatedLetters from '@/components/animations/AnimatedLetters';
import AnimatedLines from '@/components/animations/AnimatedLines';
import BtnDelEvent from '@/components/buttons/BtnDelEvent';
import BtnEdit from '@/components/buttons/BtnEdit';
import { getAllDjs } from '@/services/server/djs';
import OnScrollBtnMove from '@/components/buttons/OnScrollBtnMove';
import SecondaryHeader from '@/components/typography/SecondaryHeader';
import { placeholder } from '@/public/placeholder';

type Props = {
  params: {
    id: string
  },
  searchParams: Record<string, string> | null | undefined
};

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const event: EventToShow = await getEvent(params.id);

  return {
    title: `${event.name} | Eventas`,
    description: 'Geriausi eventai pajūryje!',
  };
}

export async function generateStaticParams() {
  const events = await getAllEvents() as AllEvents;
  return events.newEvents.map((event) => ({
    id: event._id,
  }));
}

const Event = async ({ params, searchParams }: Props) => {
  let djs = [] as Dj[];
  const event: EventToShow = await getEvent(params.id);
  const showEventEdit = searchParams?.eventEdit;
  const isLoggedIn = cookies().get('saga-sessionToken');
  if (isLoggedIn) {
    djs = await getAllDjs() as Dj[];
  }
  const returnBioLines = (bio: string): string[] => bio.split('/n');

  return (
    <main className="overflow-x-hidden text-center flex flex-col items-center justify-center  ">
      {event
        && (
        <>
          <section className="flex flex-col justify-center mb-24 items-center lg:mb-60">
            <h1 className="flex flex-col text-shadow mb-10 text-red-400 uppercase font-popins font-black">

              <span className="text-3xl min-[400px]:text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl tracking-wide hyphens-auto ">
                <AnimatedLetters
                  text={event.name}
                />
              </span>
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl">
                <AnimatedLetters
                  text={dateTimeToDisplay(event.date)}
                />
              </span>
            </h1>

            <div className="relative w-[calc(100vw-20px)] h-[25vh] min-[450px]:h-[35vh]  sm:h-[50vh]  md:h-[60vh] md:w-[90vw] lg:h-[60vh] lg:w-[70vw]  xl:h-[60vh] xl:w-[60vw]">
              <Image
                className="event-poster__image"
                src={event.image.url}
                alt="Evento posteris"
                priority
                layout="fill"
                sizes="(min-width: 1280px) 60vw, (min-width: 1040px) 70vw, (min-width: 780px) 90vw, calc(100vw - 29px)"
                placeholder="blur"
                blurDataURL={placeholder}
              />
            </div>
            {event.isActive && event.ticketLink
              && (
              <div className="mt-20 sm:mt-12 md:-mt-10">
                <OnScrollBtnMove ticketLink={event.ticketLink} />
              </div>
              )}
            {isLoggedIn
                && (
                <div className="flex mt-20 justify-around ">
                  <BtnDelEvent id={event._id!} name={event.name} />
                  <BtnEdit hrefOpen="?eventEdit=true" />
                </div>
                )}
          </section>

          {event.bio && event.bio != ''

            ? (
              <section className="my-10 lg:my-40">
                <SecondaryHeader addClass="text-4xl min-[380px]:text-4xl min-[480px]:text-5xl sm:text-6xl  md:text-8xl lg:text-9xl mb-20">
                  Informacija:
                </SecondaryHeader>
                <a
                  href={event.locationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center gap-2 text-lg md:text-xl lg:text-4xl text-center text-white hover:text-gray-500 transition-colors duration-300 ease-in-out font-dela"
                >
                  <span className="text-red-400 text-center text-3xl sm:text-5xl"><FaLocationDot /></span>
                  <span>{event.location}</span>
                </a>

                <AnimatedLines
                  containerClass=" text-xs md:text-sm lg:text-base mb-5"
                  lines={returnBioLines(event.bio)}
                />

              </section>
            )
            : (
              <a
                href={event.locationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center gap-2 text-lg md:text-xl lg:text-4xl text-center text-white hover:text-gray-500 transition-colors duration-300 ease-in-out font-dela"
              >
                <span className="text-red-400"><FaLocationDot size={50} /></span>
                <span>{event.location}</span>
              </a>
            )}

            {(event.djs && event.djs.length > 0)
               && (
               <section className="my-10 lg:my-40">
                 <SecondaryHeader addClass="text-4xl min-[380px]:text-4xl min-[480px]:text-5xl sm:text-6xl  md:text-8xl lg:text-9xl mb-20">
                   Už muziką atsako:
                 </SecondaryHeader>
                 <DjList djs={event.djs} />
               </section>
               )}
            {event?.locationMapLink
            && (
            <section className="flex flex-col justify-center items-center mt-20">
              <SecondaryHeader addClass="text-4xl min-[380px]:text-4xl min-[480px]:text-5xl sm:text-6xl  md:text-8xl lg:text-9xl my-32">
                ĮVYKIO VIETA
              </SecondaryHeader>

              <a
                href={event.locationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center gap-2 mb-10 text-lg md:text-xl lg:text-5xl text-center text-white hover:text-gray-500 transition-colors duration-300 ease-in-out font-dela"
              >
                <span className="text-red-400"><FaLocationDot size={50} /></span>
                <span>{event.location}</span>
              </a>

              <div className="relative mb-20 mx-10 w-full max-w-[700px] rounded-xl block h-[280px] sm:h-[400px] md:h-[500px] ">
                <iframe
                  className="rounded-xl border border-solid border-black"
                  src={event.locationMapLink}

                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    boxShadow: 'inset 0 0 100px rgb(0, 0, 0)',
                  }}
                />
              </div>

            </section>
            )}

            {showEventEdit && isLoggedIn
              && (
              <PopUp closeLink={`/events/${params.id}`}>
                <EventForm djs={djs} event={event} />
              </PopUp>
              )}
        </>
        )}
    </main>
  );
};

export default Event;
