"use client"

import { createWithContent, createEmpty } from "@/components/reactDraftEditor/DraftRichEditor"
import dynamic from "next/dynamic"
import { useCallback, useState } from "react"
import EditorFooter from "./EditorFooter"
import { EditorMenuContext, RichEditorMenu } from "./EditorMenu"
import { uploadContext } from "@/lib/query"
import { convertToRaw } from "draft-js"
import { openInformationModal } from "./ui/UiModal"

const DraftRichEditor = dynamic(() => import("@/components/reactDraftEditor/DraftRichEditor"), { ssr: false })

const RichEditor = ({
    defaultValue = "",
    hash_key = "",
    type = ""
}) => {
    const [loading, setLoading] = useState(false);
    const [editorState, setEditorState] = useState(() => {
        if (!!defaultValue) return createWithContent(defaultValue);
        return createEmpty()
    })
    const onSave = useCallback(() => {
        if (typeof document === "undefined") return;
        // const html = document.getElementById("DraftEditor")?.innerHTML
        //     // .replace(' ', `<pre />`)
        // // ?.replaceAll(" ", "&nbsp;")
        // if (!html) return;
        setLoading(true)
        const context = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        uploadContext(type, hash_key, context)
            .finally(() => {
                setLoading(false)
            })
            .then(() => {
                openInformationModal(() => ({ title: "修改成功" }))
            })
            .catch(e => {
                openInformationModal(() => ({ title: "修改失败", children: e.message }))
            })
    }, [editorState])
    return (
        <div className="container ml-auto pt-16 mr-auto relative" style={{ maxWidth: 900 }}>
            <EditorFooter
                editorState={editorState}
                onChange={setEditorState}
                onSave={onSave}
                loading={loading}
                type={type}
                hash_key={hash_key}
            />
            <EditorMenuContext
                menu={(
                    <RichEditorMenu
                        editorState={editorState}
                    />
                )}
            >
                <DraftRichEditor
                    editorState={editorState}
                    onChange={setEditorState}
                />
            </EditorMenuContext>
        </div>
    )
}
export default RichEditor