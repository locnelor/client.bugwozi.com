"use client"

import { DraftRichProvider } from "@/components/reactDraftEditor/DraftRichEditor"


const CourseProvider = ({ children }: React.PropsWithChildren) => {

    return (
        <DraftRichProvider
            value={{
                mathBaseURL: "http://localhost:14500/mathjax"
            }}

        >
            {children}
        </DraftRichProvider>
    )
}
export default CourseProvider