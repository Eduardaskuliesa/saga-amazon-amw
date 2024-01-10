/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable import/prefer-default-export */

export async function createAlbum(formData: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/album`, {
    method: "POST",

    body: formData,
  });

  return await res.json();
}

export async function deleteAlbum(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/album/${id}`,
    {
      method: "DELETE",
    }
  );

  return await res.json();
}

export async function updateAlbum(formData: NewEvent, id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/album/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "aplication/json",
      },
      body: JSON.stringify(formData),
    }
  );

  return res.json();
}
