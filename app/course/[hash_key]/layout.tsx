import { LayoutProps } from "@/interfaces/page"
import { getQuery } from "@/lib/client"
import CourseEntity from "@/interfaces/CourseEntity"
import { notFound } from "next/navigation"
import CourseMenu from "./CourseMenu"
import { GetCourseContextQuery } from "./GetCourseContextQuery"



const CourseIdLayout = async ({
    children,
    params: {
        hash_key
    }
}: {
    children: React.ReactNode
    params: {
        hash_key: string
    }
}) => {
    const { data, error } = await getQuery<{
        getCourseContext: CourseEntity,
        getContextPowers: boolean
    }>(GetCourseContextQuery, { hash_key, type: "course" });
    if (!data || !!error || !data.getCourseContext) return notFound()
    return (
        <div className="drawer lg:drawer-open">
            <input id="course-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side z-40 border-r lg:-mt-16 pt-16">
                <label htmlFor="course-drawer" aria-label="close sidebar" className="drawer-overlay" />
                <CourseMenu
                    data={data.getCourseContext}
                    power={data.getContextPowers}
                />
            </div>
            <div className="drawer-content pt-10 pl-1 pr-1 relation">
                <div
                    className="fixed z-30 top-16 left-0"
                >
                    <label
                        htmlFor="course-drawer"
                        className="btn btn-square btn-ghost drawer-button cursor-pointer"
                    >
                        <svg width="30" height="30" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    </label>
                </div>
                {children}
            </div>
        </div>
    )
}
export default CourseIdLayout