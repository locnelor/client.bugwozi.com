import CourseContentEntity, { CourseContentFields } from "@/interfaces/CourseContentEntity"
import { PageProps } from "@/interfaces/page"
import { getQuery } from "@/lib/client"
import { gql } from "@apollo/client"
import { Metadata } from "next"
import RichEditorContext from "@/components/RichEditorContext"
import UiDivider from "@/components/ui/UiDivider"
import { DraftContainer } from "@/components/Container"
import { authQuery } from "@/hooks/useAuth"
import PayCourse from "./PayCourse"
import UserNameAvatar from "@/components/UserNameAvatar"


const GetCourseContextQuery = gql`
    query GetCourseContext($hash_key:String!,$type:String!){
        getContextPowers(hash_key:$hash_key,type:$type)
        getCourseChapterContext(hash_key:$hash_key){
            ${CourseContentFields}
            authors{
                user{
                    id
                    name
                    hash_key
                }
            }
        }
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
        getCourseChapterContext: CourseContentEntity,
        getContextPowers: boolean
    }>(GetCourseContextQuery, { hash_key: context_hash_key, type: "content" })
    return {
        title: data?.getCourseChapterContext.name || "发生了一些错误",
        keywords: data?.getCourseChapterContext.keywords
    }
}
const CourseContextPage = async ({
    params: {
        context_hash_key,
        hash_key
    }
}: pageProps) => {
    const { data, error } = await getQuery<{
        getCourseChapterContext: CourseContentEntity,
        getContextPowers: boolean
    }>(GetCourseContextQuery, { hash_key: context_hash_key, type: "content" })
    if (!!error) {
        await authQuery(`/course/${hash_key}/${context_hash_key}`)
        return (
            <PayCourse
                hash_key={hash_key}
            />
        )
    }
    if (!data?.getCourseChapterContext) return "404";
    const __html = data?.getCourseChapterContext?.description || ""
    return (
        <DraftContainer>
            <h1 className="text-4xl">{data?.getCourseChapterContext.name}</h1>
            <UiDivider />
            <RichEditorContext
                __html={__html}
                updateAt={data?.getCourseChapterContext?.updateAt}
                power={data?.getContextPowers}
                hash_key={context_hash_key}
                type="content"
            >
                <h2 className="text-2xl">贡献者:</h2>
                <div className="flex flex-wrap gap-4">
                    {data?.getCourseChapterContext?.authors?.map(({ userId, user }) => (
                        <div
                            key={userId}
                        >
                            <UserNameAvatar
                                user={user}
                            />
                        </div>
                    ))}
                </div>
            </RichEditorContext>
        </DraftContainer>
    )
}
export default CourseContextPage