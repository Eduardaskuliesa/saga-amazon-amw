"use client"
import { useState } from "react"

type Props = {
  animationClass: string,
  children: React.ReactNode
}

const HoverAnimation = ({ animationClass, children }: Props) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className={isHovered ? animationClass : ""}
    onMouseEnter={() => setIsHovered(true)}
    onAnimationEnd={() => setIsHovered(false)}
    >
      {children}
    </div>
  )
}

export default HoverAnimation