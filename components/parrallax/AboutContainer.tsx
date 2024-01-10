/* eslint-disable max-len */

'use client';

import React from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import NavLink from '../navbar/NavLink';
import bgImage from '../../public/bgImage.jpg';

const AboutContainer = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
  });
  return (
    <div
      ref={ref}
      className={`${inView ? 'element-show' : 'element-animation'} lg:pt-16 flex z-10 gap-10 text-white
     flex-col lg:flex-row justify-center items-center w-[90%] md:w-[80%] lg:w-[80%] lg:pr-16 center md:mb-0`}
    >
      <div className="text-xl w-[100%] md:w-[90%] h-full lg:w-[60%] justify-center align-middle items-center">
        <Image
          src={bgImage}
          width={500}
          height={400}
          alt="Apie mus"
          sizes="50vh"
          placeholder="blur"
          className=" w-full h-[250px] md:h-[80%] object-cover"
          style={{
            width: '100%',

          }}
        />
      </div>
      <div className="w-[100%] md:w-[100%] lg:w-[50%] h-full flex flex-col">
        <h1 className="text-4xl md:text-6xl justify-start pb-6 lg:pb-16 leading-10 text-center">Trumpai apie mus</h1>
        <p className="text-xl">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo, hic harum ipsum sed tempora voluptatibus fuga similique nulla corporis pariatur aliquid quas recusandae veritatis labore nostrum quae explicabo, assumenda quidem repudiandae et. Repudiandae sequi sapiente illum? Minus distinctio quod quisquam.</p>
        <div className="flex justify-center items-center p-10">
          <NavLink
            href="/events"
            className="flex justify-center items-center transition-all duration-300
             ease-in-out bg-red-400 rounded-3xl text-m hover:bg-red-600  w-[200px] sm:w-[300px] sm:text-xl  h-10"
          >
            Eventai

          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AboutContainer;
