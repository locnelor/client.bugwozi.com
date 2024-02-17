import CourseEntity from "@/interfaces/CourseEntity";
import { PageProps } from "@/interfaces/page";
import { getQuery } from "@/lib/client";
import { redirect } from "next/navigation";
import CourseChapterContext from "./CourseChapterContext";
import CourseHashQuery from "../CourseHashQuery";


const CourseChapterPage = async ({
    params: {
        hash_key
    }
}: PageProps<{}, { hash_key: string }>) => {
    const { data } = await getQuery<{
        courseHashQuery: CourseEntity,
        courseEditPower: boolean
    }>(CourseHashQuery, { hash_key });
    if (!data) redirect(`/course/${hash_key}`)
    return <CourseChapterContext 
        data={data.courseHashQuery}
    />
}
export default CourseChapterPage