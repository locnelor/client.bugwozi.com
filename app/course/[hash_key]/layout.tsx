import { LayoutProps } from "@/interfaces/page"
import CourseMenu from "./CourseMenu"
import CourseProvider from "./CourseProvider"

const CourseIdLayout = ({
    children,
    params: {
        hash_key
    }
}: LayoutProps<{}, { hash_key: string }>) => {
    return (
        <div className="flex gap-4 min-h-full">
            <div className="min-h-full w-56 shadow fixed">
                <CourseMenu
                    hash_key={hash_key}
                />
            </div>
            <div className="grow flex justify-center">
                <div style={{ maxWidth: "720px" }} className="w-full">
                    <CourseProvider>
                        {children}
                    </CourseProvider>
                </div>
            </div>
        </div>
    )
}
export default CourseIdLayout