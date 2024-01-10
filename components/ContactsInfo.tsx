import { HiMail, HiLocationMarker } from 'react-icons/hi';
import { FaPhoneAlt } from 'react-icons/fa';
import CopyToClipboard from './CopyToClipboard';

const ContactsInfo = () => (
  <>
    <div className="inline-flex space-x-2 items-center">
      <span className="text-red-400 text-xl">
        <FaPhoneAlt size={24} />
      </span>
      <CopyToClipboard text="+3706725369" />
    </div>

    <div className="inline-flex space-x-2 items-center">
      <span className="text-red-400 text-xl">
        <HiMail size={24} />
      </span>
      <CopyToClipboard text="eduardas2000@mail.ru" />
    </div>

    <div className="inline-flex space-x-2 items-center">
      <span className="text-red-400 text-xl">
        <HiLocationMarker size={24} />
      </span>
      <CopyToClipboard text="Klaipeda LT" />
    </div>
  </>
);

export default ContactsInfo;
