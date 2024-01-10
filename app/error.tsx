"use client"

import NavLink from "@/components/navbar/NavLink"

const Error = ({
    error,
    reset
}: {
    error: Error,
    reset: () => void
}) => {
  return (
    <main className="h-screen flex flex-col justify-center items-center">
        <div className='simple-background'/>
        <div className="text-2xl text-white flex flex-col justify-center items-center ">
            <h1 className="font-bold">Ups, kazkas nepavyko :(</h1>
            <button className="underline mt-5" onClick={reset}>Megink dar karta</button>
            <NavLink href="/" className="underline" >
                Gryzti i Home
            </NavLink>
        </div>
    </main>
  )
}

export default Error