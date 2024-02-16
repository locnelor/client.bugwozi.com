import { LayoutProps } from "@/interfaces/page"
import CourseProvider from "./CourseProvider"
import { gql } from "@apollo/client"
import { getQuery } from "@/lib/client"
import CourseEntity from "@/interfaces/CourseEntity"
import { notFound } from "next/navigation"
import Link from "next/link"
const CourseHashQuery = gql`
    query CourseHashQuery($hash_key:String!){
        courseHashQuery(hash_key:$hash_key){
            id
            hash_key
            CourseChapter{
                name
                id
                createAt
                updateAt
                CourseContent{
                    id
                    name
                    hash_key
                }
            }
        }
    }
`
const CourseIdLayout = async ({
    children,
    params: {
        hash_key
    }
}: LayoutProps<{}, { hash_key: string }>) => {
    const { data, error } = await getQuery<{
        courseHashQuery: CourseEntity
    }>(CourseHashQuery, { hash_key });
    if (!data || error) return notFound()
    return (
        <div className="flex gap-4 min-h-full">
            <div className="min-h-full w-56 shadow fixed">
                <ul className="menu rounded-box">
                    <li>
                        <a>简介</a>
                    </li>
                    {data.courseHashQuery.CourseChapter?.map(({ id, name, CourseContent }) => (
                        <li
                            key={`chapter_${id}`}
                        >
                            <a>{name}</a>
                            <ul>
                                {CourseContent?.map(({ name, id, hash_key }) => (
                                    <li
                                        key={id}
                                        draggable
                                    >
                                        <Link href={`/course/${data.courseHashQuery.hash_key}/${hash_key}`}>{name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="grow flex justify-center">
                <div style={{ maxWidth: "720px" }} className="w-full">
                    <CourseProvider>
                        {children}
                    </CourseProvider>
                </div>
            </div>
        </div>
    )
}
export default CourseIdLayout