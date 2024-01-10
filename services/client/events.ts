export async function createEvent(formData: NewEvent) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/event`, {
    method: 'POST',
    headers: {
      'Content-Type': 'aplication/json',
    },
    body: JSON.stringify(formData),
  });

  return res.json();
}

export async function updateEvent(formData: NewEvent, id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/event/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'aplication/json',
    },
    body: JSON.stringify(formData),
  });

  return res.json();
}

export async function deleteEvent(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/event/${id}`, {
    method: 'DELETE',

  });

  return res.json();
}

export const getAllEvents = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/event', {
    cache: 'force-cache',
    method: 'GET',
    next: { tags: ['Events'] },

  });

  return res.json().then((response) => response.events);
};
