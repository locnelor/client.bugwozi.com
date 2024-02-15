import { EditorState, Modifier } from "draft-js";
import { Map } from "immutable"
import { useMemo } from "react";

export function getSelectedBlocksMap(editorState: EditorState) {
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const startKey = selectionState.getStartKey();
    const endKey = selectionState.getEndKey();
    const blockMap = contentState.getBlockMap();
    return blockMap
        .toSeq()
        .skipUntil((_, k) => k === startKey)
        .takeUntil((_, k) => k === endKey)
        .concat([[endKey, blockMap.get(endKey)]]);
}

export function getSelectedBlocksList(editorState: EditorState) {
    return getSelectedBlocksMap(editorState).toList();
}

export function getSelectedBlocksMetadata(editorState: EditorState) {
    let metaData = Map({});
    const selectedBlocks = getSelectedBlocksList(editorState);
    if (selectedBlocks && selectedBlocks.size > 0) {
        for (let i = 0; i < selectedBlocks.size; i += 1) {
            const data = selectedBlocks.get(i).getData();
            if (!data || data.size === 0) {
                metaData = metaData.clear();
                break;
            }
            if (i === 0) {
                metaData = data;
            } else {
                metaData.forEach((value, key) => {
                    // eslint-disable-line no-loop-func
                    if (!data.get(key) || data.get(key) !== value) {
                        if (!!key) metaData = metaData.delete(key);
                    }
                });
                if (metaData.size === 0) {
                    metaData = metaData.clear();
                    break;
                }
            }
        }
    }
    return metaData;
}
export const useSelectedBlocksMetadata = (editorState: EditorState) => {
    return useMemo(() => getSelectedBlocksMetadata(editorState), [editorState]);
}
export function setBlockData(editorState: EditorState, data: any) {
    const newContentState = Modifier.setBlockData(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        data
    );
    return EditorState.push(editorState, newContentState, 'change-block-data');
}
