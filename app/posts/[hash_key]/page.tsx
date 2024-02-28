import EditorContext from "@/components/EditorContext"
import { PostsEntity, PostsFields } from "@/interfaces/PostsEntity"
import { PageProps } from "@/interfaces/page"
import { getQuery } from "@/lib/client"
import gql from "graphql-tag"
import { notFound } from "next/navigation"


const SelPostsQuery = gql`
    query SelPosts(
        $hash_key:String!
    ){
        getByHashKey(hash_key:$hash_key){
            ${PostsFields}
        }
        getPostsPower(hash_key:$hash_key)
    }
`
const PostsContextPage = async ({
    params: { hash_key }
}: PageProps<{}, { hash_key: string }>) => {
    const { data, error } = await getQuery<{
        getByHashKey: PostsEntity,
        getPostsPower: boolean
    }>(SelPostsQuery, {
        hash_key
    })
    if (!data) return notFound()
    return (
        <div className="container m-auto" style={{ maxWidth: 700 }}>
            <h1>{data.getByHashKey.name}</h1>
            <EditorContext
                context={data.getByHashKey.context}
                savePath={`/posts/${hash_key}/context`}
                updateAt={data.getByHashKey.updateAt}
                power={data.getPostsPower}
                authors={[data.getByHashKey.author as any]}
            />
        </div>
    )
}
export default PostsContextPage