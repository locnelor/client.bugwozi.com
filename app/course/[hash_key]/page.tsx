import CourseEntity from "@/interfaces/CourseEntity"
import { PageProps } from "@/interfaces/page"
import { getQuery } from "@/lib/client"
import { Metadata } from "next"
import UserAvatar from "@/components/UserAvatar"
import UiButton from "@/components/ui/UiButton"
import CourseHashQuery from "./CourseHashQuery"
import EditorContext from "@/components/EditorContext"

export async function generateMetadata(
    { params: { hash_key } }: PageProps<{}, { hash_key: string }>
): Promise<Metadata> {
    const { data, error } = await getQuery<{ courseHashQuery: CourseEntity }>(CourseHashQuery, {
        hash_key
    })
    return {
        title: data?.courseHashQuery.name,
        keywords: data?.courseHashQuery.keywords
    }
}


const CourseIdPage = async ({
    params: {
        hash_key
    }
}: PageProps<{}, { hash_key: string }>) => {
    const { data, error } = await getQuery<{
        courseHashQuery: CourseEntity,
        courseEditPower: boolean
    }>(CourseHashQuery, {
        hash_key
    })

    return (
        <div>
            <div className="flex flex-wrap gap-2">
                {data?.courseHashQuery.keywords.split(",").map((keyword, key) => (
                    <div key={key}>
                        <UiButton size="sm">
                            {keyword}
                        </UiButton>
                    </div>
                ))}
            </div>
            <h1 className="text-4xl">{data?.courseHashQuery.name}</h1>
            <EditorContext
                context={data?.courseHashQuery.description}
                updateAt={data?.courseHashQuery.createAt}
                power={data?.courseEditPower}
                savePath={`/course/${hash_key}/context`}
            >
                <div>
                    <h1 className="text-xl">贡献者:</h1>
                    <div className="flex flex-wrap gap-2">
                        {data?.courseHashQuery.head?.map(({ user }) => (
                            <UserAvatar
                                key={user?.id}
                                user={user}
                            />
                        ))}
                    </div>
                </div>
            </EditorContext>
        </div>
    )
}
export default CourseIdPage