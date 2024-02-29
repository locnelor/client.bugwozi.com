import EditorContext from "@/components/EditorContext"
import { PostsEntity, PostsFields } from "@/interfaces/PostsEntity"
import { PageProps } from "@/interfaces/page"
import { getQuery } from "@/lib/client"
import gql from "graphql-tag"
import { notFound } from "next/navigation"


const GetMyPostsByHashKeyQuery = gql`
    query GetMyPostsByHashKey(
        $hash_key:String!
    ){
        getMyPostsByHashKey(hash_key:$hash_key){
            ${PostsFields}
        }
    }
`
const HomeAdminPostsContextPage = async ({
    params: { hash_key }
}: PageProps<{}, { hash_key: string }>) => {
    const { data, error } = await getQuery<{
        getMyPostsByHashKey: PostsEntity
    }>(GetMyPostsByHashKeyQuery, {
        hash_key
    })
    if (!data) return notFound()
    return (
        <div className="container m-auto" style={{ maxWidth: 700 }}>
            <h1>{data.getMyPostsByHashKey.name}</h1>
            <EditorContext
                context={data.getMyPostsByHashKey.context}
                savePath={`/posts/${hash_key}/context`}
                updateAt={data.getMyPostsByHashKey.updateAt}
                power={true}
                authors={[data.getMyPostsByHashKey.author as any]}
            />
        </div>
    )
}
export default HomeAdminPostsContextPage