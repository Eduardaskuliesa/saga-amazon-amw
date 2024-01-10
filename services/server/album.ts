// eslint-disable-next-line import/prefer-default-export
export const getAlbum = async (id: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/album/${id}`, {
    method: 'GET',
    cache: 'force-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { tags: ['Albums', 'Photo'] },
  });
  return res.json().then((response) => response.album);
};

export default async function getAllAlbums() {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/album', {
    method: 'GET',
    cache: 'force-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { tags: ['Albums'] },
  });

  return res.json().then((response) => response.albums);
}
