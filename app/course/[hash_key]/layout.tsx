import { LayoutProps } from "@/interfaces/page"
import CourseProvider from "./CourseProvider"
import { getQuery } from "@/lib/client"
import CourseEntity from "@/interfaces/CourseEntity"
import { notFound } from "next/navigation"
import Link from "next/link"
import CourseHashQuery from "./CourseHashQuery"
import { LineHeightIcon } from "@radix-ui/react-icons"

const CourseIdLayout = async ({
    children,
    params: {
        hash_key
    }
}: LayoutProps<{}, { hash_key: string }>) => {
    const { data, error } = await getQuery<{
        courseHashQuery: CourseEntity,
        courseEditPower: boolean
    }>(CourseHashQuery, { hash_key });
    if (!data || error || !data.courseHashQuery) return notFound()
    return (
        <div className="flex gap-4 min-h-full">
            <div className="min-h-full w-56 shadow fixed">
                <ul className="menu rounded-box">
                    <li>
                        <Link href={`/course/${data.courseHashQuery.hash_key}`}>简介</Link>
                    </li>
                    {data.courseEditPower && (
                        <li><Link href={`/course/${hash_key}/chapter`}>目录管理</Link></li>
                    )}
                    {(Array.from(data.courseHashQuery.CourseChapter || []))
                        .sort((a, b) => a.order - b.order)
                        .map(({ id, name, CourseContent }) => (
                            <li
                                key={`chapter_${id}`}
                            >
                                <span>{name}</span>
                                <ul>
                                    {Array.from(CourseContent || [])
                                        .sort((a, b) => a.order - b.order)
                                        .map(({ name, id, hash_key, type }) => (
                                            <li
                                                key={id}
                                            >
                                                <Link href={`/course/${data.courseHashQuery.hash_key}/${hash_key}`}>
                                                    {type === "PAID" && (
                                                        <LineHeightIcon />
                                                    )}
                                                    {name}
                                                </Link>
                                            </li>
                                        ))}
                                </ul>
                            </li>
                        ))}
                </ul>
            </div>
            <div className="grow flex justify-center">
                <div style={{ maxWidth: "720px" }} className="w-full mt-2">
                    <CourseProvider>
                        {children}
                    </CourseProvider>
                </div>
            </div>
        </div>
    )
}
export default CourseIdLayout