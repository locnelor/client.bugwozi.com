import { EditorState } from "draft-js";



const useCurrentStyle = (editorState: EditorState) => {
    try {
        const currentStyle = editorState.getCurrentInlineStyle();
        return currentStyle
    } catch (e) {
        return null
    }
}
export default useCurrentStyle