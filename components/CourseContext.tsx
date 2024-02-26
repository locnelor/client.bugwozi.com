"use client"

import CourseEntity from "@/interfaces/CourseEntity"
import { useCallback, useMemo } from "react"
import UiForm, { UiFormItem, UiFormSubmit } from "./ui/UiForm"
import UiRadio from "./ui/UiRadio"
import CourseCard from "./CourseCard"
import UiInput from "./ui/UiInput"
import UiButton from "./ui/UiButton"

export type CourseContextProps = {
    course: CourseEntity[]
}
const CourseContext = ({
    course
}: CourseContextProps) => {
    const selections = useMemo(() => [{
        label: "收费类型",
        name: "payType",
        values: ["全部", "免费", "收费"]
    }, {
        label: "课程类型",
        name: "courseType",
        values: ["全部", ...new Set(course.map(e => e.type?.name))]
    }], [course]);
    const onSubmit = useCallback((data: any) => {
        console.log(data)
    }, [course]);
    return (
        <div className="container">
            
            {course.map((item) => (
                <CourseCard
                    key={item.id}
                    data={item}
                    readOnly
                />
            ))}
        </div>
    )
}
export default CourseContext