/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/function-component-definition */

"use client";

import { useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { animatePageIn } from "@/components/animations/PageTransition";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  useEffect(() => {
    animatePageIn();
  }, [pathname]);
  return (
    <div>
      <div
        id="transition-element"
        className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(75,24,24,1) 0%, rgba(46,31,31,1) 60%, rgba(0,0,0,1) 100%)",
          zIndex: "150",
        }}
      >
        <div
          className="loading-spinner-logo"
          id="logo-spinner"
          style={{ zIndex: "151" }}
        >
          <Image
            alt="Logo"
            src="/logo.jpg"
            width="80"
            height="80"
            className="cursor-pointer w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] rounded-full hover:opacity-90"
            priority
          />
        </div>
      </div>

      {children}
    </div>
  );
}
