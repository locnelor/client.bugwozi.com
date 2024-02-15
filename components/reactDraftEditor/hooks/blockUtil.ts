import { AtomicBlockUtils, ContentBlock, EditorState, Entity, Modifier } from "draft-js";


export const insertBlock = (
    onChange: (e: EditorState) => void,
    editorState: EditorState,
    blockName: string,
    data: any
) => {
    // const content = editorState.getCurrentContent();
    // const e = content.createEntity(blockName,"IMMUTABLE",data);

    const entityKey = Entity.create(blockName, "IMMUTABLE", data);
    const state = AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        ' '
    );
    onChange(state);

    // const content = editorState.getCurrentContent();
    // const entityKey = content.createEntity(blockName, "IMMUTABLE", data);
    // const state = AtomicBlockUtils.insertAtomicBlock(
    //     editorState,
    //     entityKey,
    //     ' '
    // );
    // onChange(state);
}
export const mergeBlock = (
    block: ContentBlock,
    editorState: EditorState,
    data: any
) => {
    const key = block.getEntityAt(0);
    const content = editorState.getCurrentContent();
    const newContent = content.mergeEntityData(key, data);
    return EditorState.push(editorState, newContent, "change-block-data");
}
export const insertText = (
    onChange: (e: EditorState) => void,
    editorState: EditorState,
    text: string
) => {
    const state = Modifier.insertText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        text
    )
    onChange(
        EditorState.push(editorState, state, "insert-characters")
    )
}