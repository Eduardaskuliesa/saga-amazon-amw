export async function addYtVideo(formData: NewYtVideo) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/video`, {
    method: 'POST',
    headers: {
      'Content-Type': 'aplication/json',
    },
    body: JSON.stringify(formData),
  });

  return res.json();
}

export async function removeYtVideo(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/video/${id}`, {
    method: 'DELETE',

  });

  return res.json();
}
