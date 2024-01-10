'use client';

import React, { useState } from 'react';

type Props = {
  text: string,
};

const CopyToClipboard = ({ text }: Props) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    navigator.clipboard.writeText(e.currentTarget.innerText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      });
  };

  return (
    <div className="relative">
      <div className={`absolute select-none pointer-events-none -top-16 bg-red-400 rounded-lg opacity-0 duration-200 ${copied && 'opacity-100'} `}>
        <span className='flex text-sm relative p-2 text-center
                afterr:content-[""] after:absolute after:bottom-0 after:left-1/2
                after:w-0 after:h-0 after:border-[0.9rem] after:border-transparent
                after:border-solid after:border-t-red-400 after:border-b-0 after:ml-[-0.9rem]
                after:mb-[-0.9rem]
            '
        >
          Tekstas nukopijuotas!

        </span>
      </div>
      <button onClick={copyToClipboard}>{text}</button>
    </div>

  );
};

export default CopyToClipboard;
