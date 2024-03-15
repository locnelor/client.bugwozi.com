"use client"
import DraftToolbar from "@/components/reactDraftEditor/DraftRichEditor/DraftToolbar"
import UiButton from "@/components/ui/UiButton"
import { EditorState } from "draft-js"



export type EditorFooterProps = {
    onChange: (editorState: EditorState) => void,
    editorState: EditorState,
    onSave: () => void,
    loading?: boolean
    type: string
    hash_key: string
}
const EditorFooter = ({
    onChange,
    editorState,
    loading = false,
    onSave,
    type,
    hash_key
}: EditorFooterProps) => {
    return (
        <div className="h-14 fixed top-16 flex z-10 gap-2 w-full bg-base-100">
            <div className="flex justify-center">
                <DraftToolbar
                    onChange={onChange}
                    editorState={editorState}
                    className=""
                    type={type}
                    hash_key={hash_key}
                >
                    <UiButton
                        loading={loading}
                        onClick={onSave}
                        size="sm"
                    >
                        保存
                    </UiButton>
                </DraftToolbar>
            </div>
        </div>
    )
}
export default EditorFooter