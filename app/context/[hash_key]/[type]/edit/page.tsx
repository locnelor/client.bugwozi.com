import RichEditor from "@/components/RichEditor"
import { PageProps } from "@/interfaces/page"
import { getQuery } from "@/lib/client"
import gql from "graphql-tag"
import { Metadata } from "next"

const GetSourceContextQuery = gql`
    query GetSourceContext($hash_key:String!,$type:String!){
        getSourceContext(hash_key:$hash_key,type:$type)
    }
`
export const metadata: Metadata = {
    title: "文章编辑"
}
const ContextHashEditPage = async ({
    params: { hash_key, type }
}: PageProps<{}, { hash_key: string, type: string }>) => {
    const { data, error } = await getQuery<{ getSourceContext: string }>(GetSourceContextQuery, { hash_key, type })
    return (
        <RichEditor
            defaultValue={data?.getSourceContext}
            type={type}
            hash_key={hash_key}
            saveKey={`${type}_${hash_key}`}
        />
    )
}
export default ContextHashEditPage