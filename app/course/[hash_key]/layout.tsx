import { LayoutProps } from "@/interfaces/page"
import CourseMenu from "./CourseMenu"
import { DraftRichProvider } from "@/components/reactDraftEditor/DraftRichEditor"

const CourseIdLayout = ({
    children,
    params: {
        hash_key
    }
}: LayoutProps<{}, { hash_key: string }>) => {
    return (
        <div className="flex gap-4 min-h-full">
            <div className="min-h-full w-56 shadow">
                <CourseMenu
                    hash_key={hash_key}
                />
            </div>
            <div className="grow flex justify-center">
                <div style={{ maxWidth: "720px" }} className="w-full">
                    {/* <DraftRichProvider
                        value={{
                            mathBaseURL: "http://localhost:14500/mathjax"
                        }}
                    >
                        {children}
                    </DraftRichProvider> */}
                    {children}
                </div>
            </div>
        </div>
    )
}
export default CourseIdLayout