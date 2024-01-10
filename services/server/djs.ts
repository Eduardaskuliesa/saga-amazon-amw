import { cookies } from 'next/headers';

export const getAllDjs = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/dj', {
    next: { tags: ['Djs'] },
    cache: 'force-cache',
    headers: {
      Cookie: cookies().toString(),
      'Content-Type': 'application/json',
    },
  });
  return res.json().then((response) => response.djs);
};
