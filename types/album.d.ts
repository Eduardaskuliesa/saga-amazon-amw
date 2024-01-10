type Album = {
  _id: string
  name: string
  date: string
  images: AlbumImages[]
};

type AlbumImages = {
  _id:string
  public_id: string,
  url: string
  height: number,
  width: number,
};
type NewAlbum = Omit<Albums, '_id'>;
