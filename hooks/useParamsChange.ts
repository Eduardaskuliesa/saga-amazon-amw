"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const useParamsChange = () => {

    return (param: string, value: string) => {
        const searchParams = useSearchParams()
        const params = new URLSearchParams(searchParams)
        const pathname = usePathname()
        const { replace } = useRouter() 

        params.set(param, value)
        replace(`${pathname}?${params.toString()}`)
    }
    
}

export default useParamsChange;
