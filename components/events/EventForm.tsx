'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { createEvent, updateEvent } from '@/services/client/events';

type Props = {
  event?: MainEvent
  djs: Dj[]
};

const EventForm = ({ event, djs }: Props) => {
  const [allDjs, setAllDjs] = useState<Dj[]>([]);
  const [selectedDjs, setSelectedDjs] = useState<SelectedDj[]>([]);
  const [activeDj, setActiveDj] = useState({
    _id: '',
    name: '',
  });
  const [image, setImage] = useState<string | ArrayBuffer | null>('');
  let isDjPopulated = false;

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!isDjPopulated && event) {
      addOldDjs();
    }
    setAllDjs(djs);
    setActiveDj({
      _id: djs[0]._id || '',
      name: djs[0].name,
    });
  }, []);

  const addOldDjs = () => {
    if (event?.djs) {
      event.djs.forEach((dj: Dj) => {
        setSelectedDjs((prevData) => [
          ...prevData,
          { _id: dj._id!, name: dj.name },
        ]);
      });
      isDjPopulated = true;
    }
  };

  const handeSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const finalDjs: EventDj[] = selectedDjs.map((dj) => ({ _id: dj._id }));

    const date = `${e.target.date.value}T${e.target.time.value}`;

    const formToSend: NewEvent = {
      name: e.target.name.value,
      image,
      location: e.target.location.value,
      locationLink: e.target.locationLink.value,
      date,
      ticketLink: e.target.ticketLink.value,
      isActive: e.target.isActive.value === 'true',
      djs: finalDjs,
    };

    if (e.target.locationMapLink.value !== '') {
      formToSend.locationMapLink = e.target.locationMapLink.value;
    }

    if (e.target.bio.value !== '') {
      formToSend.bio = e.target.bio.value;
    }

    let res;
    if (event) {
      res = await updateEvent(formToSend, event._id!);
    } else {
      res = await createEvent(formToSend);
    }

    setError('');
    setMessage('');
    if (res.message) {
      setLoading(false);
      setMessage(res.message);
      e.target.reset();
      router.refresh();
      setSelectedDjs([]);
    } else if (res.error) {
      setLoading(false);
      setError(res.error);
    }
  };

  const handleDjChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDj = e.target.options[e.target.selectedIndex];
    const _id = selectedDj.value;
    const name = selectedDj.getAttribute('data-name');
    setActiveDj({
      _id,
      name: name || '',
    });
  };

  const addDj = () => {
    const newDj = {
      _id: activeDj._id,
      name: activeDj.name,
    };
    setSelectedDjs([...selectedDjs, newDj]);
  };

  const removeDj = (index: number) => {
    setSelectedDjs(selectedDjs.filter((_, i) => i !== index));
  };

  const handleImageChange = (e:any) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  return (
    <form
      onSubmit={handeSubmit}
      className="bg-white flex max-w-[500px] sm:max-w-[800px] flex-col justify-center items-center rounded-xl shadow-lg p-4 sm:p-4  text-gray-600"
    >
      <div className="flex flex-row sm:flex-row justify-center items-center">
        <div className="w-4/5 sm:w-5/12 p-2">
          <label htmlFor="name" className="text-sm">
            *Pavadinimas
            <input
              defaultValue={event?.name || ''}
              id="name"
              name="name"
              type="text"
              placeholder="Pavadinimas..."
              required
              className="ring-1 mt-2 ring-gray-300 w-full
                    rounded-md px-4 py-2 outline-none focus:ring-4 focus:ring-red-900"
            />
          </label>

          <label htmlFor="location" className="text-sm">
            *Vieta
            <input
              defaultValue={event?.location || ''}
              id="location"
              name="location"
              type="text"
              required
              placeholder="Vietos adressas..."
              className="ring-1 mt-2 ring-gray-300 w-full
                    rounded-md px-4 py-2 outline-none focus:ring-4 focus:ring-red-900"
            />
          </label>

          <label htmlFor="locationLink" className="text-sm">
            *Vietos URL
            <input
              defaultValue={event?.locationLink || ''}
              id="locationLink"
              name="locationLink"
              type="text"
              required
              placeholder="Vietos URL..."
              className="ring-1 mt-2 ring-gray-300 w-full
                    rounded-md px-4 py-2 outline-none focus:ring-4 focus:ring-red-900"
            />
          </label>

          <label htmlFor="locationMapLink" className="text-sm">
            Vietos map URL
            <input
              defaultValue={event?.locationMapLink || ''}
              id="locationMapLink"
              name="locationMapLink"
              type="text"
              placeholder="Vietos map URL..."
              className="ring-1 mt-2 ring-gray-300 w-full
                    rounded-md px-4 py-2 outline-none focus:ring-4 focus:ring-red-900"
            />
          </label>

          <label htmlFor="ticketLink" className="text-sm">
            *Bileto linkas:
            <input
              defaultValue={event?.ticketLink || ''}
              id="ticketLink"
              name="ticketLink"
              type="text"
              placeholder="Bileto URL..."
              required
              className="ring-1 mt-2 ring-gray-300 w-full
                    rounded-md px-4 py-2 outline-none focus:ring-4 focus:ring-red-900"
            />
          </label>

          <label htmlFor="date" className="text-sm">
            *Data
            <input
              defaultValue={event?.date.split('T')[0] || ''}
              type="date"
              id="date"
              name="date"
              required
              className="ring-1 mt-2 ring-gray-300 w-full
                    rounded-md px-4 py-2 outline-none focus:ring-4 focus:ring-red-900"
            />
          </label>
        </div>

        <div className="w-4/5 sm:w-5/12 sm:ml-5">
          <label htmlFor="time" className="text-sm">
            *Laikas
            <input
              defaultValue={event?.date.split('T')[1] || ''}
              type="time"
              id="time"
              name="time"
              min="00:00"
              max="23:59"
              required
              className="ring-1 mt-2 ring-gray-300 w-full
                    rounded-md px-4 py-2 outline-none focus:ring-4 focus:ring-red-900"
            />
          </label>

          <label htmlFor="bio" className="text-sm">
            Aprasymas
            <textarea
              defaultValue={event?.bio || ''}
              id="bio"
              name="bio"
              placeholder="Aprasymas..."
              rows={7}
              className="ring-1 mt-2 ring-gray-300 w-full
                    rounded-md px-4 py-2 outline-none focus:ring-4 focus:ring-red-900"
            />
          </label>

          <label htmlFor="image" className="text-sm">
            *Foto/img
            <input
              onChange={handleImageChange}
              id="image"
              name="image"
              type="file"
              accept="image/jpg"
              {...(event ? {} : { required: true })}
              className="ring-1 mt-2 ring-gray-300 w-full
                    rounded-md px-4 py-2 outline-none focus:ring-4 focus:ring-red-900"
            />
          </label>

          <label htmlFor="djs" className="text-sm">
            Djs
            <select
              onChange={handleDjChange}
              className="ring-1 mt-2 ring-gray-300 w-full
                        rounded-md px-4 py-2 outline-none focus:ring-4 focus:ring-red-900"
              id="djs"
              name="djs"
            >
              {allDjs.length > 0
                            && allDjs.map((dj) => (
                              <option key={dj._id} value={dj._id} data-name={dj.name}>
                                {dj.name}
                              </option>
                            ))}
            </select>
          </label>
          <button
            type="button"
            className="my-2 mr-5 bg-red-900 text-white font-bold rounded-lg px-3 py-1 hover:bg-transparent hover:text-red-900 border border-red-900 duration-300 text-sm"
            onClick={addDj}
          >
            Prideti Dj
          </button>
          <div className="flex flex-wrap">
            {selectedDjs.length > 0
                        && selectedDjs.map((dj, i) => (
                          <div key={dj._id + dj.name + i} className="flex mx-2">
                            <p>{dj.name}</p>
                            <button type="button" onClick={() => removeDj(i)}><GrFormClose size={17} /></button>
                          </div>
                        ))}
          </div>
        </div>

      </div>
      <div className="flex flex-col justify-center ">
        <label htmlFor="active">
          <input
            type="radio"
            className="mr-2"
            id="active"
            name="isActive"
            value="true"
            defaultChecked={event?.isActive === true}
          />
          Artejantis
        </label>
        <label htmlFor="inActive">
          <input
            className="mr-2"
            type="radio"
            id="inActive"
            name="isActive"
            value="false"
            defaultChecked={event?.isActive !== true}
          />
          Praejas
        </label>
      </div>
      <p className="text-base mt-2 text-red-900">{error}</p>
      <p className="text-base mt-2 text-green-900">{message}</p>
      <button
        type="submit"
        disabled={loading}
        className="mt-6 bg-red-900 text-white disabled:bg-gray-300 disabled:text-black disabled:cursor-not-allowed font-bold rounded-lg px-6 py-2 hover:bg-transparent hover:text-red-900 border border-red-900 duration-300 uppercase text-sm"
      >
        {event
          ? 'Atnaujinti Eventa'
          : 'Kurti Eventa'}
      </button>
    </form>
  );
};

export default EventForm;
