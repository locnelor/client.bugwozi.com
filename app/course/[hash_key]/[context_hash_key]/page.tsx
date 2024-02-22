import CourseContentEntity from "@/interfaces/CourseContentEntity"
import { PageProps } from "@/interfaces/page"
import { getQuery } from "@/lib/client"
import { gql } from "@apollo/client"
import { Metadata } from "next"
import EditorContext from "@/components/EditorContext"
import EditorContainer from "@/components/EditorContainer"


const GetCourseContextQuery = gql`
    query GetCourseContext($hash_key:String!){
        getCourseContext(hash_key:$hash_key){
            id
            createAt
            updateAt
            description
            hash_key
            keywords
            type
            name
        }
        contextEditPower(hash_key:$hash_key)
    }
`
type pageProps = PageProps<{}, {
    hash_key: string,
    context_hash_key: string
}>
export async function generateMetadata(
    { params: { context_hash_key } }: pageProps
): Promise<Metadata> {
    const { data } = await getQuery<{
        getCourseContext: CourseContentEntity
    }>(GetCourseContextQuery, { hash_key: context_hash_key })
    return {
        title: data?.getCourseContext.name || "发生了一些错误",
        keywords: data?.getCourseContext.keywords
    }
}
const CourseContextPage = async ({
    params: {
        context_hash_key
    }
}: pageProps) => {
    const { data, error } = await getQuery<{
        getCourseContext: CourseContentEntity,
        contextEditPower: boolean
    }>(GetCourseContextQuery, { hash_key: context_hash_key })
    if (!!error) return error.message;

    if (!data?.getCourseContext) return "404";
    return (
        <EditorContainer>
            <EditorContext
                context={data.getCourseContext.description}
                power={data.contextEditPower}
                updateAt={data.getCourseContext.updateAt}
                savePath={`/context/${context_hash_key}/context`}
            />
        </EditorContainer>
    )
}
export default CourseContextPage