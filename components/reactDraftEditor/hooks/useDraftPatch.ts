import { useEffect } from 'react';
import { noop } from 'lodash';
import { Modifier, EditorState } from 'draft-js';

interface Props {
    editorRef: React.MutableRefObject<any>;
    onChange: (value: EditorState) => void;
    editorState: EditorState
}

// 解决方案：在监听到compositionstart（输入法编辑器事件）时，将selection部分置空
const useDraftPatch = ({ editorRef, onChange, editorState }: Props) => {
    useEffect(() => {
        if (editorRef.current) {
            const el = editorRef.current.editor;
            const handler = () => {
                // onChange()
                try {
                    const selection = editorState.getSelection();
                    const contentState = editorState.getCurrentContent();
                    // 将选中文字部分置空
                    const nextContentState = Modifier.replaceText(
                        contentState,
                        selection,
                        '',
                        undefined
                    );
                    onChange(EditorState.push(
                        editorState,
                        nextContentState,
                        'insert-characters'
                    ));
                } catch (e) {
                    console.error(e);
                    return editorState;
                }
            };
            // 监听输入法编辑器事件
            el.addEventListener('compositionstart', handler);
            return () => {
                el.removeEventListener('compositionstart', handler);
            };
        }
        return noop;
    }, [editorRef, editorState, onChange]);
};

export default useDraftPatch;