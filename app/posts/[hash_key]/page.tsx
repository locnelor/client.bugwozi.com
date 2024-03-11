import RichEditorContext from "@/components/RichEditorContext"
import UiDivider from "@/components/ui/UiDivider"
import { PostsEntity, PostsFields } from "@/interfaces/PostsEntity"
import { PageProps } from "@/interfaces/page"
import { getQuery } from "@/lib/client"
import gql from "graphql-tag"
import { Metadata } from "next"
import { notFound } from "next/navigation"


const SelPostsQuery = gql`
    query SelPosts(
        $hash_key:String!,
        $type:String!
    ){
        getContextPowers(hash_key:$hash_key,type:$type)
        getPostsContext(hash_key:$hash_key){
            ${PostsFields}
        }
    }
`
type pageProps = PageProps<{}, {
    hash_key: string
}>
export async function generateMetadata(
    { params: { hash_key } }: pageProps
): Promise<Metadata> {
    const { data } = await getQuery<{
        getPostsContext: PostsEntity,
        getContextPowers: boolean
    }>(SelPostsQuery, { hash_key, type: "posts" })
    return {
        title: data?.getPostsContext.name || "发生了一些错误",
        description: data?.getPostsContext.description
    }
}
const PostsContextPage = async ({
    params: { hash_key }
}: PageProps<{}, { hash_key: string }>) => {
    const { data, error } = await getQuery<{
        getPostsContext: PostsEntity,
        getContextPowers: boolean
    }>(SelPostsQuery, { hash_key, type: "posts" })
    if (!data) {
        console.log(error)
        return notFound()
    }
    const __html = data?.getPostsContext?.context || ""
    return (
        <div className="container ml-auto mr-auto" style={{ maxWidth: 1000 }}>
            <h1 className="text-4xl mt-4">{data?.getPostsContext.name}</h1>
            <UiDivider />
            <RichEditorContext
                __html={__html}
                updateAt={data?.getPostsContext?.updateAt}
                power={data?.getContextPowers}
                hash_key={hash_key}
                type="posts"
            >
            </RichEditorContext>
        </div>
    )
}
export default PostsContextPage