type NewYtVideo = {
  name: string,
  date: string,
  youtubeId: string,
  event?: string
};

type YtVideo = NewYtVideo & {
  _id: string
};
