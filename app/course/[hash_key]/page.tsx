import CourseEntity, { CourseFields } from "@/interfaces/CourseEntity"
import { PageProps } from "@/interfaces/page"
import { getQuery } from "@/lib/client"
import { Metadata } from "next"
import UserAvatar from "@/components/UserAvatar"
import UiButton from "@/components/ui/UiButton"
// import CourseHashQuery from "./CourseHashQuery"
import EditorContext from "@/components/EditorContext"
import EditorContainer from "@/components/EditorContainer"
import UserNameAvatar from "@/components/UserNameAvatar"
import { gql } from "@apollo/client"
import { UserHeadCourseFields } from "@/interfaces/UserHeadCourseEntity"
import { CourseChapterFields } from "@/interfaces/CourseChapterEntity"
import { CourseContentFields } from "@/interfaces/CourseContentEntity"

const GetCourseContextQuery = gql`
    query GetCourseContext($hash_key:string){
        courseEditPower(hash_key:$hash_key)
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
    const { data } = await getQuery<{ courseHashQuery: CourseEntity }>(GetCourseContextQuery, {
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
    }>(GetCourseContextQuery, { hash_key })
    const __html = data?.courseHashQuery.description || ""
    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html }}>

            </div>
        </div>
    )
    // const { data, error } = await getQuery<{
    //     courseHashQuery: CourseEntity,
    //     courseEditPower: boolean
    // }>(CourseHashQuery, {
    //     hash_key
    // })    
    // return (
    //     <EditorContainer>
    //         <div className="flex flex-wrap gap-2">
    //             {data?.courseHashQuery.keywords.split(",").map((keyword, key) => (
    //                 <div key={key}>
    //                     <UiButton size="sm">
    //                         {keyword}
    //                     </UiButton>
    //                 </div>
    //             ))}
    //         </div>
    //         <h1 className="text-4xl">{data?.courseHashQuery.name}</h1>
    //         <EditorContext
    //             context={data?.courseHashQuery.description}
    //             updateAt={data?.courseHashQuery.createAt}
    //             power={data?.courseEditPower}
    //             savePath={`/course/${hash_key}/context`}
    //         >
    //             <div>
    //                 <h1 className="text-xl">贡献者:</h1>
    //                 <div className="flex flex-wrap gap-2">
    //                     {data?.courseHashQuery.head?.map(({ user }) => (
    //                         <UserNameAvatar
    //                             user={user}
    //                             key={user?.id}
    //                         />
    //                     ))}
    //                 </div>
    //             </div>
    //         </EditorContext>
    //     </EditorContainer>
    // )
}
export default CourseIdPage