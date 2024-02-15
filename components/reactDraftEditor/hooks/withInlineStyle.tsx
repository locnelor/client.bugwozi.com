import { RichUtils } from "draft-js";
import { useCallback } from "react";
import useCurrentStyle from "./useCurrentStyle";
import ToggleButton, { ToggleButtonEditorPtops } from "../components/ToggleButton";

const withInlineStyle = (
    Component: () => JSX.Element,
    style: string,
    title: string
) => {
    const Result = ({
        editorState,
        onChange,
        className,
        checkClassName
    }: ToggleButtonEditorPtops) => {
        const currentStyle = useCurrentStyle(editorState);
        const onMouseDown = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            const newState = RichUtils.toggleInlineStyle(
                editorState,
                style
            )
            onChange(newState)
        }, [editorState, onChange])
        return (
            <ToggleButton
                value={style}
                className={!!currentStyle?.has(style) ? checkClassName : className}
                onMouseDown={onMouseDown}
                title={title}
            >
                <Component />
            </ToggleButton>
        )
    }
    return Result
}
export default withInlineStyle