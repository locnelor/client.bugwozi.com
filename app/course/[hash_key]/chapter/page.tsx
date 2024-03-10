import { PageProps } from "@/interfaces/page";
import { redirect } from "next/navigation";
import CourseChapterContext from "./CourseChapterContext";
import {  getCourseContextQuery } from "../GetCourseContextQuery";


const CourseChapterPage = async ({
    params: {
        hash_key
    }
}: PageProps<{}, { hash_key: string }>) => {
    const { data } = await getCourseContextQuery(hash_key)
    if (!data) redirect(`/course/${hash_key}`)
    return <CourseChapterContext
        data={data.getCourseContext}
    />
}
export default CourseChapterPage