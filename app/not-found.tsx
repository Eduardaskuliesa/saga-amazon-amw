import { Metadata } from "next"

export const metadata: Metadata = {
    title: "404 | Nera tokio puslapio",
    description: "Toks puslapis neegzistuoja!"
}
export const dynamic = 'force-static'


const NotFound = () => {
  return (
    <main className='h-screen flex flex-col justify-center items-center'>
        <div className='simple-background'/>
        <h2 className='text-white flex flex-col justify-center items-center gap-4'>
            <span className='text-4xl font-bold'>404 </span>
            <span className='text-xl font-semibold'>Ups, tokio puslapio nera :(</span>
        </h2>
    </main>
  )
}

export default NotFound