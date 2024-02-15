"use client"

import { createEmpty } from "@/components/reactDraftEditor/DraftRichEditor"
import DraftToolbar from "@/components/reactDraftEditor/DraftRichEditor/DraftToolbar"
import dynamic from "next/dynamic"
import { useState } from "react"

const DraftRichEditor = dynamic(() => import("@/components/reactDraftEditor/DraftRichEditor"), { ssr: false })
const CourseIdPage = () => {
    //获取文章。获取个人信息，是否可添加chapter
    const [editorState, setEditorState] = useState(createEmpty())
    return (
        <div>
            <DraftToolbar
                editorState={editorState}
                onChange={setEditorState}
            />
            <DraftRichEditor
                editorState={editorState}
                onChange={setEditorState}
            />
        </div>
    )
}
export default CourseIdPage