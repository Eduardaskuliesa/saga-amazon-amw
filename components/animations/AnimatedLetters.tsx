type Props = {
  text: string
};

const AnimatedLetters = ({ text }: Props) => {
  const letters = text.split('');

  return (
    < >
      {
            letters.map((letter, i) => (
              <span
                key={letter + i}
                className="letter-animations"
                style={{ animationDelay: `${1.4 + i * 0.1}s` }}
              >
                {letter !== ' ' ? letter : '\u00A0' }
              </span>
            ))
        }
    </>
  );
};

export default AnimatedLetters;
