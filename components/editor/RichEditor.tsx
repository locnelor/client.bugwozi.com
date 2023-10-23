"use client"

import { Editor, EditorState } from "draft-js"
import { useCallback, useState } from "react"
import styled from "styled-components"


const Container = styled.div`

`


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
        <Container>
            <Editor
                editorState={editorState}
                onChange={onChangeEditorState}
                readOnly={readOnly}
            />
        </Container>
    )
}
export default RichEditor