"use client"

import { createEmpty } from "@/components/reactDraftEditor/DraftRichEditor"
import dynamic from "next/dynamic"
import { useState } from "react"
import EditFooter from "./EditFooter"

const DraftRichEditor = dynamic(() => import("@/components/reactDraftEditor/DraftRichEditor"), { ssr: false })
const CourseIdPagetest = () => {
    //获取文章。获取个人信息，是否可添加chapter
    const [editorState, setEditorState] = useState(createEmpty())
    return (
        <div>
            <DraftRichEditor
                editorState={editorState}
                onChange={setEditorState}
            />
            <EditFooter
                editorState={editorState}
                onChange={setEditorState}
            />
        </div>
    )
}
export default CourseIdPagetest