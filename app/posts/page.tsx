import PostsContext from "@/components/PostsContext"
import { PostsEntity, PostsFields } from "@/interfaces/PostsEntity"
import { getQuery } from "@/lib/client"
import { gql } from "@apollo/client"

export async function generateMetadata(
) {
    return {
        title: "文章"
    }
}
const SelPostsQuery = gql`
    query SelPosts(
        $id:Int,
        $take:Int,
        $keywords:String
    ){
        selPosts(
            id:$id,
            take:$take,
            keywords:$keywords
        ){
            ${PostsFields}
        }
    }
`
const PostsPage = async () => {
    const { data } = await getQuery<{
        selPosts: PostsEntity[]
    }>(SelPostsQuery)
    return (
        <div className="mt-4">
            <PostsContext
                data={data?.selPosts || []}
                readOnly
            />
        </div>
    )
}
export default PostsPage