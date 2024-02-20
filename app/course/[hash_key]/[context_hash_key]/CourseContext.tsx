"use client"

import { createWithContent, createEmpty } from "@/components/reactDraftEditor/DraftRichEditor"
import CourseContentEntity from "@/interfaces/CourseContentEntity"
import { useCallback, useState } from "react"
import EditFooter from "../EditFooter"
import moment from "moment"
import dynamic from "next/dynamic"
import { openModal } from "@/components/ui/UiModal"
import { convertToRaw } from "draft-js"
import { uploadContextPost } from "@/lib/query"


const DraftRichEditor = dynamic(() => import("@/components/reactDraftEditor/DraftRichEditor"), { ssr: false })

export type CourseContextProps = {
    content: CourseContentEntity,
    power?: boolean
}
const CourseContext = ({
    content,
    power = false
}: CourseContextProps) => {
    const [editorState, setEditorState] = useState(() => {
        if (!!content.description) return createWithContent(content.description)
        else return createEmpty()
    })
    const [loading, setLoading] = useState(false);
    const [readOnly, setReadOnly] = useState(true);
    const onSave = useCallback(() => {
        setLoading(true);
        const context = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        uploadContextPost(content.hash_key, { context })
            .then(() => {
                openModal(() => ({ title: "修改成功" }))
            }).catch((e) => {
                console.log(e)
                openModal(() => ({ children: e.message, title: "修改失败" }))
            })
            .finally(() => {
                setLoading(false)
            });
    }, [editorState, content])
    return (
        <div className="min-h-full">
            <DraftRichEditor
                editorState={editorState}
                onChange={setEditorState}
                readOnly={readOnly}
            />
            {!readOnly && <EditFooter
                editorState={editorState}
                onChange={setEditorState}
                onSave={onSave}
                loading={loading}
            />}
            <div className="text-right">
                最后一次编辑:{moment(content?.updateAt).format("YYYY-MM-DD HH:mm:ss")}
            </div>
            {power && (
                <div className="text-right">
                    <span
                        className="cursor-pointer underline"
                        onClick={() => setReadOnly(!readOnly)}
                    >
                        编辑此页
                    </span>
                </div>
            )}
        </div>
    )
}
export default CourseContext