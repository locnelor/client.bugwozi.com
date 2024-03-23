import CourseEntity from "@/interfaces/CourseEntity"
import { PageProps } from "@/interfaces/page"
import { getQuery } from "@/lib/client"
import { Metadata } from "next"
import UserNameAvatar from "@/components/UserNameAvatar"
import RichEditorContext from "@/components/RichEditorContext"
import { GetCourseContextQuery } from "./GetCourseContextQuery"
import { DraftContainer } from "@/components/Container"


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
        <DraftContainer>
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
        </DraftContainer>
    )
}
export default CourseIdPage