"use client"
import { removeYtVideo } from '@/services/client/ytVideo';
import { useRouter } from 'next/navigation';
import { HiOutlineTrash } from 'react-icons/hi';

type Props = {
  id: string,
  name: string
  addClass?: string,
}

const BtnRemoveVideo =  ({ id, name, addClass }: Props) => {
  const router = useRouter()

  const handleDelete = async () => {
    const confText = `Ar tikrai nori pasalinti "${name}", video?`
    if(confirm(confText) === true){
      const res = await removeYtVideo(id)
      alert(res.message)
      router.refresh()
    }
}

  return(
    <button onClick={() => handleDelete()} type="button" className={`text-red-600 hover:text-red-400 transition-colors duration-300 ease-in-out ${addClass}`}>
      <HiOutlineTrash size={40} />
    </button>
  )
}

export default BtnRemoveVideo;