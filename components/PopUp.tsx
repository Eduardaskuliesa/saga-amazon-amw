import Link from 'next/link';

type Props = {
  closeLink: string,
  children: React.ReactNode,
};
const PopUp = ({ closeLink, children }: Props) => (
  <div className="fixed z-50 right-0 top-0 w-screen h-screen flex justify-center items-center">
    <Link
      href={closeLink}
    >
      <div className="absolute inset-0 backdrop-blur-sm bg-black bg-opacity-80" />
    </Link>
    <div className="relative">
      {children}
    </div>
  </div>
);

export default PopUp;
