"use client"

import CourseEntity from "@/interfaces/CourseEntity"
import { gql, useQuery } from "@apollo/client"
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
export type CourseMenuProps = {
    hash_key: string
}
const CourseMenu = ({ hash_key }: CourseMenuProps) => {
    const { data, loading } = useQuery<{
        courseHashQuery: CourseEntity
    }>(CourseHashQuery, { variables: { hash_key } })

    if (loading) return (
        <div className="skeleton w-full h-96" />
    )

    return (
        <ul className="menu rounded-box">
            <li>
                <a>简介</a>
            </li>

            {data?.courseHashQuery?.CourseChapter?.map(({ id, name, CourseContent }) => (
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
    );
}
export default CourseMenu