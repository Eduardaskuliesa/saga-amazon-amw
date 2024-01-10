export const getAllEvents = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/event', {
    method: 'GET',
    cache: 'force-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { tags: ['Events'] },

  });

  return res.json().then((response) => response.events);
};

export const getEvent = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/event/${id}`, {
    method: 'GET',
    cache: 'force-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { tags: ['Events'] },

  });

  return res.json().then((response) => response.event);
};
