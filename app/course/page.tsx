import Container from "@/components/Container"
import CourseCard from "@/components/CourseCard"
import CourseEntity from "@/interfaces/CourseEntity"
import { getQuery } from "@/lib/client"
import SelCourse from "@/queries/SelCourse.gql"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: '课程',
}

const CoursePage = async () => {
    const { data } = await getQuery<{
        selCourse: CourseEntity[]
    }>(SelCourse)
    return (
        <Container>
            <div className="flex gap-4 flex-wrap">
                {data?.selCourse.map((e) => (
                    <CourseCard
                        key={e.id}
                        data={e}
                        readOnly
                    />
                ))}
            </div>
        </Container>
    )
}
export default CoursePage