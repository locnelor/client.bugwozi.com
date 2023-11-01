"use client"

import { Editor, EditorState } from "draft-js"
import { useCallback, useState } from "react"


const RichEditor = ({
    initialValue,
    onChange,
    readOnly = false,
    config
}: any) => {
    const [editorState, setEditorState] = useState(() => {

        return EditorState.createEmpty()
    })

    const onChangeEditorState = useCallback((editorState: EditorState) => {
        setEditorState(editorState);
    }, []);


    return (
        <div>
            <Editor
                editorState={editorState}
                onChange={onChangeEditorState}
                readOnly={readOnly}
            />
        </div>
    )
}
export default RichEditor