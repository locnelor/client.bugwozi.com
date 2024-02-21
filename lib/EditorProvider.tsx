"use client"

import { DraftRichProvider } from "@/components/reactDraftEditor/DraftRichEditor"


const EditorProvider = ({ children }: React.PropsWithChildren) => {

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
export default EditorProvider