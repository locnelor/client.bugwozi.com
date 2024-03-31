"use client"

import { createWithContent, createEmpty } from "@/components/reactDraftEditor/DraftRichEditor"
import dynamic from "next/dynamic"
import { useCallback, useEffect, useState } from "react"
import EditorFooter from "./EditorFooter"
import { EditorMenuContext, RichEditorMenu } from "./EditorMenu"
import { uploadContext } from "@/lib/query"
import { convertToRaw } from "draft-js"
import { openInformationModal, openModal } from "./ui/UiModal"

const DraftRichEditor = dynamic(() => import("@/components/reactDraftEditor/DraftRichEditor"), { ssr: false })

const RichEditor = ({
    defaultValue = "",
    hash_key = "",
    type = "",
    saveKey = ""
}) => {
    const [loading, setLoading] = useState(false);
    const [editorState, setEditorState] = useState(() => {
        if (!!defaultValue) return createWithContent(defaultValue);
        return createEmpty()
    })
    useEffect(() => {
        if (!!saveKey) {
            const saveData = window.localStorage.getItem(saveKey)
            if (!!saveData) {
                try {
                    const data = createWithContent(saveData);
                    if (!!data) {
                        openModal(() => ({
                            title: "是否载入上一次编辑内容?",
                            onOk: () => {
                                setEditorState(data);
                                return true;
                            }
                        }))
                    }
                } catch (e) { }
            }
        }
    }, [])
    useEffect(() => {
        if (!!saveKey) {
            const time = setTimeout(() => {
                window.localStorage.setItem(saveKey, JSON.stringify(convertToRaw(editorState.getCurrentContent())))
            }, 5000);
            return () => clearTimeout(time);
        }
    }, [editorState])
    const onSave = useCallback(() => {
        if (typeof document === "undefined") return;
        setLoading(true)
        const context = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        uploadContext(type, hash_key, context)
            .finally(() => {
                setLoading(false)
            })
            .then(() => {
                openInformationModal(() => ({ title: "修改成功" }))
                if (!!saveKey) {
                    window.localStorage.removeItem(saveKey)
                }
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