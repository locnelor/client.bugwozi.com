"use client"

import CourseEntity from "@/interfaces/CourseEntity"
import { useMemo } from "react"
import CourseCard from "./CourseCard"
import UiDivider from "./ui/UiDivider"

export type CourseContextProps = {
    course: CourseEntity[],
    refetch?: () => void,
    readOnly?: boolean
}
const CourseContext = ({
    course,
    refetch,
    readOnly = true
}: CourseContextProps) => {
    const types = useMemo(() => course.map(e => ({
        label: e.type?.name as string,
        render: (course: CourseEntity) => course.type?.name === e.type?.name
    })), [course])

    return (
        <div className="flex flex-col gap-3">
            {types.map(({ label, render }, key) => (
                <div
                    key={key}
                >
                    <h1 className="text-2xl mb-3">{label}</h1>
                    <UiDivider />
                    <div
                        className="flex flex-wrap gap-4"
                    >
                        {course.filter(e => render(e)).map((item => (
                            <CourseCard
                                key={item.id}
                                data={item}
                                readOnly={readOnly}
                                refetch={refetch}
                            />
                        )))}
                    </div>
                </div>
            ))}
        </div>
    )
}
export default CourseContext