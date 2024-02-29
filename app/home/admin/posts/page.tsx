"use client"
import { gql, useQuery } from "@apollo/client"
import { PostsEntity, PostsFields } from "@/interfaces/PostsEntity"
import PostsContext from "@/components/PostsContext"


const AllPostsQuery = gql`
    query AllPosts(
        $id:Int,
        $take:Int,
        $keywords:String,
        $userId:Int
    ){
        allPosts(
            id:$id,
            take:$take,
            keywords:$keywords,
            userId:$userId
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
        allPosts: PostsEntity[]
    }>(AllPostsQuery)
    return (
        <div>
            <PostsContext
                data={data?.allPosts || []}
                refetch={refetch}
            />
        </div>
    )
}
export default HomePostsPage