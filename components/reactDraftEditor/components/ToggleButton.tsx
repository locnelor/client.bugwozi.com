import { ToolbarToggleGroup, ToolbarToggleItem, ToolbarToggleItemProps } from "@radix-ui/react-toolbar";
import { EditorState } from "draft-js";
import { forwardRef } from "react";
import UiTooltip from "./ui/UiTooltip";
export const ToggleGroupButton = ToolbarToggleGroup
export type ToggleButtonEditorPtops = {
    editorState: EditorState,
    onChange: (editorState: EditorState) => void,
    checkClassName?: string,
    className?: string,
    check?: boolean,
    onMouseDown?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    title?: string
}
export type ToggleButtonProps = ToolbarToggleItemProps &
    React.RefAttributes<HTMLButtonElement>
export type ToggleButtonType = typeof ToggleButton
const ToggleButton = forwardRef<
    HTMLButtonElement,
    ToggleButtonProps
>(({
    title,
    ...props
}, ref) => {
    const btn = <ToolbarToggleItem
        ref={ref}
        {...props}
    />
    if (!!title) return (
        <UiTooltip
            trigger={btn}
        >
            {title}
        </UiTooltip>
    )
    return btn
})
export default ToggleButton