import { ContentBlock, ContentState, EditorState } from "draft-js"
import React from "react"


type AtomicProps<T> = {
    block: ContentBlock
    blockProps: {
        readOnly: boolean,
        editorState: EditorState,
        onChange: (e: EditorState) => void
    }
    data: T
    contentState: ContentState
}
function withAtomic<T>(Component: React.FC<AtomicProps<T>>) {
    const Result = (props: AtomicProps<T>) => {
        const data = props.contentState.getEntity(props.block.getEntityAt(0)).getData();
        return <Component
            {...props}
            data={data}
        />
    }
    return Result
}
export default withAtomic