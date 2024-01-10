import ImageCointainer from './ImageCointainer';

type Props = {
  album: Album,
  isLoggedIn: boolean,
};

const ImageList = ({ album, isLoggedIn }: Props) => (
  <div className="grid grid-cols-gallery gap-2 center max-w-[90%] md:max-w-[70%] lg:max-w-[70%] xl:max-w-[70%] pt-[144px]">
    {album.images.map((image, index) => (
      <ImageCointainer
        isLoggedIn={isLoggedIn}
        albumId={album._id}
        index={index}
        publicId={image.public_id}
        key={image._id}
        images={album.images}
        alt={album.name}
        height={image.height}
        width={image.width}
      />
    ))}
  </div>

);

export default ImageList;
