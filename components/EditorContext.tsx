"use client"

import { createEmpty, createWithContent } from "@/components/reactDraftEditor/DraftRichEditor"
import { convertToRaw } from "draft-js"
import dynamic from "next/dynamic"
import { useCallback, useState } from "react"
import EditorFooter from "./EditorFooter"
import moment from "moment"
import { openInformationModal } from "./ui/UiModal"
import query from "@/lib/query"
const DraftRichEditor = dynamic(() => import("@/components/reactDraftEditor/DraftRichEditor"), { ssr: false })


export type EditorContext = {
    context?: string,
    power?: boolean,
    updateAt?: string,
    savePath?: string
}
const EditorContext = ({
    context,
    savePath,
    power = false,
    updateAt,
    children
}: React.PropsWithChildren<EditorContext>) => {
    const [readOnly, setReadOnly] = useState(true);
    const [loading, setLoading] = useState(false);
    const [editorState, setEditorState] = useState(() => {
        if (!!context) return createWithContent(context);
        return createEmpty()
    })

    const onSave = useCallback(() => {
        if (!savePath) return;
        setLoading(true);
        const context = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        query.post(savePath, { context })
            .then(() => openInformationModal(() => ({ title: "修改成功" })))
            .catch((e) => openInformationModal(() => ({ title: "修改失败", children: e.message })))
            .finally(() => setLoading(false));
    }, [editorState])

    return (
        <div>
            <DraftRichEditor
                editorState={editorState}
                onChange={setEditorState}
                readOnly={readOnly}
            />
            {!readOnly && <EditorFooter
                editorState={editorState}
                onChange={setEditorState}
                onSave={onSave}
                loading={loading}
            />}
            {children}
            <div className="text-right">
                最后一次编辑:{moment(updateAt).format("YYYY-MM-DD HH:mm:ss")}
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
export default EditorContext