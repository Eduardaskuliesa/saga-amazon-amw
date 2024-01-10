/* eslint-disable import/prefer-default-export */
export async function deletePhoto(albumId: string, photoId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/photo/${albumId}/${photoId}`, {
    method: 'PATCH',
  });

  return res.json();
}
