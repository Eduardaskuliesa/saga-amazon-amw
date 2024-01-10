export const createDj = async (formData: Dj) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dj`, {
    method: 'POST',
    headers: {
      'Content-Type': 'aplication/json',
    },
    body: JSON.stringify(formData),
  });

  return res.json();
};

export const deletelDj = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dj/${id}`, {
    method: 'DELETE',
  });

  return res.json().then((response) => response);
};
