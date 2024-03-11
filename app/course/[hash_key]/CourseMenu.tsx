import LockIcon from "@/components/icons/LockIcon"
import CourseEntity from "@/interfaces/CourseEntity"
import Link from "next/link"

export type CourseMenuProps = {
    data: CourseEntity,
    power: boolean
}
const CourseMenu = ({
    data,
    power = false,
}: CourseMenuProps) => {

    return (
        <div className="bg-base-100 w-64 min-h-full">
            <ul className="menu rounded-box">
                <li>
                    <Link href={`/course/${data.hash_key}`}>简介</Link>
                </li>
                {power && (
                    <li><Link href={`/course/${data.hash_key}/chapter`}>目录管理</Link></li>
                )}
                {(Array.from(data.CourseChapter || []))
                    .sort((a, b) => a.order - b.order)
                    .map(({ id, name, CourseContent }) => (
                        <li
                            key={`chapter_${id}`}
                        >
                            <details open>
                                <summary>
                                    <span>{name}</span>
                                </summary>
                                <ul>
                                    {Array.from(CourseContent || [])
                                        .sort((a, b) => a.order - b.order)
                                        .map(({ name, id, hash_key, type }) => (
                                            <li
                                                key={id}
                                            >
                                                <Link href={`/course/${data.hash_key}/${hash_key}`}>
                                                    {name}
                                                    {type === "PAID" && (
                                                        <LockIcon theme="outline" />
                                                    )}
                                                </Link>
                                            </li>
                                        ))}
                                </ul>
                            </details>
                        </li>
                    ))}
            </ul>
        </div>
    )
}
export default CourseMenu