"use client"
import DraftToolbar from "@/components/reactDraftEditor/DraftRichEditor/DraftToolbar"
import UiButton from "@/components/ui/UiButton"
import { EditorState } from "draft-js"



export type EditorFooterProps = {
    onChange: (editorState: EditorState) => void,
    editorState: EditorState,
    onSave: () => void,
    loading?: boolean
}
const EditorFooter = ({
    onChange,
    editorState,
    loading = false,
    onSave
}: EditorFooterProps) => {
    return (
        <div className="z-40 fixed bottom-0 bg-base-100 flex">
            <DraftToolbar
                onChange={onChange}
                editorState={editorState}
                className="z-40 relative"
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
    )
}
export default EditorFooter