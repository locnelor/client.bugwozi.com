"use client"

import UiDivider from "@/components/ui/UiDivider"
import AddCourse from "./AddCourse"
import { useQuery } from "@apollo/client"
import AllCourse from "@/queries/AllCourse.gql"
import CourseCard from "@/components/CourseCard"
import CourseContext from "@/components/CourseContext"

const HomeAdminCoursePage = () => {
    const {
        data,
        loading,
        error,
        refetch
    } = useQuery(AllCourse)
    return (
        <div>
            <AddCourse refetch={refetch} />
            <UiDivider />
            <CourseContext
                course={((loading ? new Array(10).fill(0) : data.allCourse) as any[])}
                refetch={refetch}
                readOnly={false}
            />
        </div>
    )
}
export default HomeAdminCoursePage