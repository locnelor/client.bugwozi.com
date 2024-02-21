"use client"

import { DraftRichProvider } from "@/components/reactDraftEditor/DraftRichEditor"


const CourseProvider = ({ children }: React.PropsWithChildren) => {

    return (
        <DraftRichProvider
            value={{
                mathBaseURL: `${process.env.NEXT_PUBLIC_API}/mathjax`
            }}

        >
            {children}
        </DraftRichProvider>
    )
}
export default CourseProvider