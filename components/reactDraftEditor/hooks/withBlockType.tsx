import { RichUtils } from "draft-js";
import { useCallback } from "react";
import ToggleButton, { ToggleButtonEditorPtops } from "../components/ToggleButton";
import useCurrentBlockType from "./useCurrentBlockType";



const withBlockType = (
    Component: () => JSX.Element,
    blockType: string,
    title: string
) => {
    const Result = ({
        editorState,
        onChange,
        className,
        checkClassName
    }: ToggleButtonEditorPtops) => {
        const currentType = useCurrentBlockType(editorState);
        const onMouseDown = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            const newState = RichUtils.toggleBlockType(editorState, blockType)
            onChange(newState)
        }, [editorState, onChange])
        return (
            <ToggleButton
                value={blockType}
                className={currentType === blockType ? checkClassName : className}
                onMouseDown={onMouseDown}
                title={title}
            >
                <Component />
            </ToggleButton>
        )
    }
    return Result
}
export default withBlockType