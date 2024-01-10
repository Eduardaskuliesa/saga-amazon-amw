import { BsFacebook, BsYoutube, BsSpotify } from 'react-icons/bs';
import { AiFillInstagram } from 'react-icons/ai';
import { PiSoundcloudLogoFill } from 'react-icons/pi';

const returnIcon = ({ platform, url }: Socials) => {
  switch (platform) {
    case 'Facebook':
      return (
        <a href={url} target="_blank" aria-label="Facebook icon" rel="noreferrer"><BsFacebook  /></a>);

    case 'Instagram':
      return (
        <a href={url} target="_blank" aria-label="Instagram icon" rel="noreferrer"><AiFillInstagram  /></a>);

    case 'Soundcloud':
      return (
        <a href={url} target="_blank" aria-label="Soundcloud icon" rel="noreferrer"><PiSoundcloudLogoFill  /></a>);

    case 'Spotify':
      return (
        <a href={url} target="_blank" aria-label="Spotify icon" rel="noreferrer"><BsSpotify  /></a>);

    case 'Youtube':
      return (
        <a href={url} target="_blank" aria-label="Youtube icon" rel="noreferrer"><BsYoutube  /></a>);
    default:
      return null;
  }
};

const BtnSocial = ({ platform, url }: Socials) => (
  <div className="text-red-400 text-3xl  sm:text-5xl">
    {returnIcon({ platform, url })}
  </div>

);

export default BtnSocial;
