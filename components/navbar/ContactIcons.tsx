import { AiFillInstagram } from 'react-icons/ai';
import {
  BsFacebook, BsTwitter, BsTiktok, BsYoutube,
} from 'react-icons/bs';
import HoverAnimation from '../HoverAnimation';

type Props = {
  sizeMultiplyer?: number,
  iconClass?: string,
};

const ContactIcons = ({ sizeMultiplyer = 1, iconClass }: Props) => (
  <>
    <HoverAnimation animationClass="contact__icon-animation">
      <a className={`contact__icon--simple ${iconClass}`} href="https://www.facebook.com/profile.php?id=100089236126258" target="_blank" aria-label="Facebook icon" rel="noreferrer"><BsFacebook size={22 * sizeMultiplyer} /></a>
    </HoverAnimation>

    <HoverAnimation animationClass="contact__icon-animation">
      <a className={`contact__icon--simple ${iconClass}`} href="https://www.facebook.com/profile.php?id=100089236126258" target="blank" aria-label="Instagram icon"><AiFillInstagram size={28 * sizeMultiplyer} /></a>
    </HoverAnimation>

    <HoverAnimation animationClass="contact__icon-animation">
      <a className={`contact__icon--simple ${iconClass}`} href="https://www.facebook.com/profile.php?id=100089236126258" target="blank" aria-label="Twiter icon"><BsTwitter size={22 * sizeMultiplyer} /></a>
    </HoverAnimation>

    <HoverAnimation animationClass="contact__icon-animation">
      <a className={`contact__icon--simple ${iconClass}`} href="https://www.facebook.com/profile.php?id=100089236126258" target="blank" aria-label="Youtube icon"><BsYoutube size={22 * sizeMultiplyer} /></a>
    </HoverAnimation>

    <HoverAnimation animationClass="contact__icon-animation">
      <a className={`contact__icon--simple ${iconClass}`} href="https://www.facebook.com/profile.php?id=100089236126258" target="blank" aria-label="TickTock icon"><BsTiktok size={22 * sizeMultiplyer} /></a>
    </HoverAnimation>

  </>
);

export default ContactIcons;
