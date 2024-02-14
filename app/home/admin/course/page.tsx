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
            <AddCourse />
            <UiDivider />
            <div className="flex flex-wrap gap-1">
                {
                    ((loading ? new Array(10).fill(0) : data.selCourse) as any[])
                        .map((e, key) => (
                            <CourseCard
                                data={e}
                                key={key}
                            />
                        ))
                }
            </div>
        </div>
    )
}
export default HomeAdminCoursePage