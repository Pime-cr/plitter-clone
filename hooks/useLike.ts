import axios from "axios"
import { toast } from "react-hot-toast"
import { useCallback, useMemo } from "react"

import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLoginModal"
import usePost from "./usePost"
import usePosts from "./usePosts"

const useLike = ({postId , userId} : {postId:string , userId?:string}) => {
    const { data: currentUser} = useCurrentUser() 
    const { data: fetchedPost , mutate: mutateFetchedPost } = usePost(postId)  

    const {mutate: mutateFetchedPosts} = usePosts(userId)

    const loginModal = useLoginModal()

    const hasLike = useMemo(()=>{

        const list = fetchedPost?.likedIds || []

        return list.includes(currentUser?.id)

    },[fetchedPost, currentUser])

    const toogleLike = useCallback(async ()=>{
        if(!currentUser) {
            return loginModal.onOpen()
        }
        try {
            let request;

            if (hasLike){
                request = () => axios.delete('/api/like',{ data: {postId} })
            } else {
                request = () => axios.post('/api/like',{ postId })
            }
            await request()

            mutateFetchedPost()
            mutateFetchedPosts()

            toast.success('Success')
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    },[currentUser,
        hasLike,
        postId,
        mutateFetchedPost,
        mutateFetchedPosts,
        loginModal])
    
    return {
        hasLike,
        toogleLike
    }
}

export default useLike