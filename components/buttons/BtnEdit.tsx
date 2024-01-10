import Link from 'next/link';
import React from 'react';
import { BiEdit } from "react-icons/bi"

type Props = {
  hrefOpen: string
}


const BtnEdit = ({hrefOpen}: Props ) => (

  <Link href={hrefOpen} className="text-blue-600 hover:text-blue-400 transition-colors duration-300 ease-in-out">
    <BiEdit size={40} />
  </Link>
);

export default BtnEdit;