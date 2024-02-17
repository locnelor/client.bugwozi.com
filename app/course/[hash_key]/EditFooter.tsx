"use client"
import DraftToolbar from "@/components/reactDraftEditor/DraftRichEditor/DraftToolbar"
import UiButton from "@/components/ui/UiButton"
import { EditorState } from "draft-js"



export type EditFooterProps = {
    onChange: (editorState: EditorState) => void,
    editorState: EditorState,
    onSave: () => void,
    loading?: boolean
}
const EditFooter = ({
    onChange,
    editorState,
    loading = false,
    onSave
}: EditFooterProps) => {
    return (
        <div className="z-40 fixed top-3 flex">
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
export default EditFooter