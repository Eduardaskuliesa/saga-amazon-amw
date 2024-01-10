/* eslint-disable react/react-in-jsx-scope */
type Props = {
  ticketLink: string
  addClass?: string,
  isFilled?: boolean,
};

const BtnTicketRounded = ({ ticketLink, addClass, isFilled = true }: Props) => (
  <div style={{
    animation: isFilled ? 'pulse 2s infinite' : 'none',
  }}
  >
    <a
      href={ticketLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`${isFilled
        ? ` text-white text-lg tracking-wider uppercase font-bold bg-red-400 border border-transparent rounded-full py-12 px-6 
                  hover:text-red-400 hover:bg-transparent hover:border-red-400 duration-500 shadow-xxl  ${addClass}`
        : `text-red-400 text-md tracking-wide uppercase font-semibold bg-transparent border border-red-400 rounded-full py-9 px-4 
                  hover:text-white hover:bg-red-400 hover:border-transparent duration-500 ${addClass}`
      }`}
    >
      Pirkti
    </a>
  </div>
);

export default BtnTicketRounded;
