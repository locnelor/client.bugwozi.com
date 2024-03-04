"use client"

import CourseEntity from "@/interfaces/CourseEntity"
import { useCallback, useMemo, useState } from "react"
import CourseCard from "./CourseCard"
import UiButtonRadios from "./ui/UiButtonRadios"

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
    const selections = useMemo(() => [{
        label: "收费类型",
        name: "payType",
        values: [{
            value: "all",
            label: "全部",
            render: (e: CourseEntity) => true
        }, {
            value: "free",
            label: "免费",
            render: (e: CourseEntity) => e.price === 0
        }, {
            value: "charge",
            label: "收费",
            render: (e: CourseEntity) => e.price !== 0
        }]
    }, {
        label: "课程类型",
        name: "courseType",
        values: [{
            label: "全部",
            value: "all",
            render: () => true
        }, ...course.map(e => ({
            label: e.type?.name as string,
            value: e.type?.name as string,
            render: (course: CourseEntity) => course.type?.name === e.type?.name
        }))]
    }], [course]);
    const [types, setType] = useState([selections[0].values[0], selections[1].values[0]]);
    const onChange = useCallback((index: number, values: {
        value: string,
        label: string,
        render: (e: CourseEntity) => boolean
    }[], name: string) => {
        const v = values.find(e => e.value === name);
        if (!v) return;
        types[index] = v;
        setType([...types]);
    }, [types])
    const data = useMemo(() => {
        return course.filter(item => {
            return !types.map(e => e.render(item)).some(e => !e)
        })
    }, [types, course]);
    return (
        <div className="container">
            <div className="flex flex-col gap-2 mb-2">
                {selections.map(({ name, values }, key) => (
                    <UiButtonRadios
                        key={`${key}_${name}`}
                        options={values}
                        value={types[key].value}
                        onChange={onChange.bind(null, key, values)}
                    />
                ))}
            </div>
            <div className="flex flex-wrap gap-4">
                {data.map((item, key) => (
                    <CourseCard
                        key={key}
                        data={item}
                        readOnly={readOnly}
                        refetch={refetch}
                    />
                ))}
            </div>
        </div>
    )
}
export default CourseContext