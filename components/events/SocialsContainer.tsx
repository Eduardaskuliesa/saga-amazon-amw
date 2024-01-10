
type Props = {
    isHovered: boolean,
    index: number,
    children: React.ReactNode
}

const SocialsContainer = ({ isHovered, index, children }: Props) => {
  return (
    <div 
        className={`bg-black -z-10 lg:h-full lg:w-20 h-12 sm:h-20 w-full absolute bottom-0 translate-y-12 sm:translate-y-20  lg:translate-y-0  rounded-b-xl lg:rounded-none lg:top-0 flex lg:flex-col justify-around items-center duration-500 ease 
        ${index % 2 === 0 ? "lg:left-0 lg:rounded-s-xl" : "lg:right-0 lg:rounded-e-xl"}
        ${isHovered && index % 2 !== 0 && 'lg:translate-x-20'}
        ${isHovered && index % 2 === 0 && 'lg:-translate-x-20'}`}
        
    >
        {children}
    </div>
                  
  )
}

export default SocialsContainer