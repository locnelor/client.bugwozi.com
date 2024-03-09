import CourseEntity, { CourseFields } from "@/interfaces/CourseEntity"
import { PageProps } from "@/interfaces/page"
import { getQuery } from "@/lib/client"
import { Metadata } from "next"
import UiButton from "@/components/ui/UiButton"
import UserNameAvatar from "@/components/UserNameAvatar"
import { gql } from "@apollo/client"
import { UserHeadCourseFields } from "@/interfaces/UserHeadCourseEntity"
import { CourseChapterFields } from "@/interfaces/CourseChapterEntity"
import { CourseContentFields } from "@/interfaces/CourseContentEntity"
import RichEditorContext from "@/components/RichEditorContext"

const GetCourseContextQuery = gql`
    query GetCourseContext($hash_key:String!,$type:String!){
        getContextPowers(hash_key:$hash_key,type:$type)
        getCourseContext(hash_key:$hash_key){
            ${CourseFields}
            head{
                ${UserHeadCourseFields}
            }
            CourseChapter{
                ${CourseChapterFields}
                CourseContent{
                    ${CourseContentFields}
                }
            }
        }
    }
`
export async function generateMetadata(
    { params: { hash_key } }: PageProps<{}, { hash_key: string }>
): Promise<Metadata> {
    const { data } = await getQuery<{ getCourseContext: CourseEntity }>(GetCourseContextQuery, {
        hash_key,
        type: "course"
    })
    return {
        title: data?.getCourseContext?.name,
        keywords: data?.getCourseContext?.keywords
    }
}


const CourseIdPage = async ({
    params: {
        hash_key
    }
}: PageProps<{}, { hash_key: string }>) => {
    const { data } = await getQuery<{
        getCourseContext: CourseEntity,
        getContextPowers: boolean
    }>(GetCourseContextQuery, { hash_key, type: "course" })
    const __html = data?.getCourseContext?.description || ""
    return (
        <div>
            <div className="flex flex-wrap gap-2">
                {data?.getCourseContext.keywords.split(",").map((keyword, key) => (
                    <div key={key}>
                        <UiButton size="sm">
                            {keyword}
                        </UiButton>
                    </div>
                ))}
            </div>
            <h1 className="text-4xl">{data?.getCourseContext.name}</h1>
            <RichEditorContext
                __html={__html}
                updateAt={data?.getCourseContext?.updateAt}
                power={data?.getContextPowers}
                hash_key={hash_key}
                type="course"
            >
                <div>
                    <h1 className="text-xl">贡献者:</h1>
                    <div className="flex flex-wrap gap-2">
                        {data?.getCourseContext.head?.map(({ user }) => (
                            <UserNameAvatar
                                user={user}
                                key={user?.id}
                            />
                        ))}
                    </div>
                </div>
            </RichEditorContext>
        </div>
    )
}
export default CourseIdPage