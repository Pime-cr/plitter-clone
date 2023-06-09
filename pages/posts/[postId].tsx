//external imports
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

//hooks
import usePost from "@/hooks/usePost";


//components
import Form from "@/components/Form";
import Header from "@/components/Header";
import CommentFeed from "@/components/posts/CommentFeed";
import PostItem from "@/components/posts/PostItem";

const PostView = () => {
    const router = useRouter()

    const {postId} = router.query

    const { data: fetchedPost , isLoading } = usePost(postId as string)

    //check if the post exist 
    if(isLoading || !fetchedPost){
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="lightblue" size={80}/>
            </div>
        )
    }

    //default post view 
    return ( 
        <>
            <Header label="Tweet" showBackArrow/>
            <PostItem data={fetchedPost}/>
            <Form postId={postId as string} isComment placeholder="Tweet your reply"/>
            <CommentFeed comments={fetchedPost?.comments}/>
        </>
     );
}
 
export default PostView;