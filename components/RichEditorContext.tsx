"use client"
import moment from "moment"
import Link from "next/link"
import TopAffix from "./TopAffix"
import { NoCopy } from "@/hooks/useNoCopy"
import Editor, { createEmpty, createWithContent } from "@/components/reactDraftEditor/DraftRichEditor"
import { useMemo } from "react"
import { RichEditorMenu } from "./EditorMenu"


const RichEditorContext = ({
    __html = "",
    updateAt = moment().format("YYYY-MM-DD"),
    power = false,
    hash_key = "",
    type = "",
    children = "" as React.ReactNode
}) => {
    const editorState = useMemo(() => {
        if (!!__html) return createWithContent(__html);
        return createEmpty()
    }, [__html])
    return (
        <div style={{ maxWidth: 900 }} className="drawer drawer-end lg:drawer-open">
            <input id="context-drawer" type="checkbox" className="drawer-toggle" />
            <div style={{ maxWidth: 720 }} className="w-full drawer-content">
                <Editor
                    editorState={editorState}
                    onChange={() => { }}
                    readOnly
                />
                {children}
                <div className="text-right">
                    最后一次编辑:{moment(updateAt).format("YYYY-MM-DD HH:mm:ss")}
                </div>
                {power && (
                    <div className="text-right">
                        <span
                            className="cursor-pointer underline"
                        >
                            <Link target="_blank" href={`/context/${hash_key}/${type}/edit`}>
                                编辑此页
                            </Link>
                        </span>
                    </div>
                )}
            </div>
            <div className="grow drawer-side z-30">
                <label htmlFor="context-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="min-h-full bg-base-100 pt-16">
                    <RichEditorMenu
                        editorState={editorState}
                    />
                </div>
            </div>
            <TopAffix />
            <NoCopy />
        </div>
    )
}
export default RichEditorContext