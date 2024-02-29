"use client"
import UiDivider from "@/components/ui/UiDivider"
import AddPosts from "./AddPosts"
import { gql, useQuery } from "@apollo/client"
import { PostsEntity, PostsFields } from "@/interfaces/PostsEntity"
import PostsCard from "@/components/PostsCard"
import PostsContext from "@/components/PostsContext"


const MyPostsQuery = gql`
    query MyPosts(
        $id:Int,
        $take:Int,
        $keywords:String
    ){
        myPosts(
            id:$id,
            take:$take,
            keywords:$keywords
        ){
            ${PostsFields}
        }
    }
`
const HomePostsPage = () => {
    const {
        data,
        loading,
        error,
        refetch
    } = useQuery<{
        myPosts: PostsEntity[]
    }>(MyPostsQuery)
    return (
        <div>
            <AddPosts
                refetch={refetch}
            />
            <UiDivider />
            <PostsContext
                data={data?.myPosts || []}
                refetch={refetch}
            />
        </div>
    )
}
export default HomePostsPage