import useSWR from 'swr'

import fetcher from '@/libs/fetcher'

const useNotification = (userId:string) => {
    const url = userId ? `/api/notifications/${userId}` : null ;

    const { data , error , mutate , isLoading} = useSWR(url,fetcher)

    return {
        data,
        error,
        mutate,
        isLoading
    }
}

export default useNotification