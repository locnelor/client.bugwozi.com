"use client"

import { createEmpty, createWithContent } from "@/components/reactDraftEditor/DraftRichEditor"
import dynamic from "next/dynamic"
import { useCallback, useState } from "react"
import EditFooter from "./EditFooter"
import CourseEntity from "@/interfaces/CourseEntity"
import moment from "moment"
import { convertToRaw } from "draft-js"
import { uploadCourseContextPost } from "@/lib/query"
import { openModal } from "@/components/ui/UiModal"

const DraftRichEditor = dynamic(() => import("@/components/reactDraftEditor/DraftRichEditor"), { ssr: false })

export type CoursePageContextProps = React.PropsWithChildren<{
    power?: boolean,
    data?: CourseEntity
}>
const CoursePageContext = ({
    power = false,
    data,
    children
}: CoursePageContextProps) => {
    const [readOnly, setReadOnly] = useState(true);
    const [loading, setLoading] = useState(false);
    const [editorState, setEditorState] = useState(() => {
        if (!!data?.description) return createWithContent(data?.description)
        else return createEmpty()
    })
    const onSave = useCallback(() => {
        if (!data) return;
        setLoading(true);
        const context = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        uploadCourseContextPost(data.hash_key, { context })
            .then(() => {
                openModal(() => ({ title: "修改成功" }))
            }).catch((e) => {
                console.log(e)
                openModal(() => ({ children: e.message, title: "修改失败" }))
            })
            .finally(() => {
                setLoading(false)
            });
    }, [editorState, data]);
    return (
        <div>
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
            {children}
            <div className="text-right">
                最后一次编辑:{moment(data?.updateAt).format("YYYY-MM-DD HH:mm:ss")}
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
export default CoursePageContext