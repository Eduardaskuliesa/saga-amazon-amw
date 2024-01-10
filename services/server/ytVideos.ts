export const getAllYtVideos = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/video', {
    method: 'GET',
    cache: 'force-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { tags: ['YtVideos'] },

  });

  return res.json().then((response) => response.ytVideos);
};
