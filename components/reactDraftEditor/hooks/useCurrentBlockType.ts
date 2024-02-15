import { EditorState } from "draft-js";


const useCurrentBlockType = (editorState: EditorState) => {
    try {
        const selection = editorState.getSelection()
        return editorState.getCurrentContent()
            .getBlockForKey(selection.getStartKey()).getType();
    } catch (e) {
        return ""
    }
}
export default useCurrentBlockType