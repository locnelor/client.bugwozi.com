"use client"

import UiDivider from "@/components/ui/UiDivider"
import AddCourse from "./AddCourse"
import { useQuery } from "@apollo/client"
import SelCourse from "@/queries/SelCourse.gql"
import CourseCard from "@/components/CourseCard"

const HomeAdminCoursePage = () => {
    const {
        data,
        loading,
        error,
        refetch
    } = useQuery(SelCourse)
    return (
        <div>
            <AddCourse refetch={refetch} />
            <UiDivider />
            <div className="flex flex-wrap gap-1">
                {((loading ? new Array(10).fill(0) : data.selCourse) as any[])
                    .map((e, key) => {
                        return (
                            <CourseCard
                                data={e}
                                key={e?.id || key}
                                refetch={refetch}
                            />
                        )
                    })}
            </div>
        </div>
    )
}
export default HomeAdminCoursePage