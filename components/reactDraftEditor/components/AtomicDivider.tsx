import withToggleButton from "../hooks/withToggleButton"
import ToggleButton from "./ToggleButton"
import { useCallback } from "react"
import { insertBlock } from "../hooks/blockUtil"
import withAtomic from "../hooks/withAtomic"


export const AtomicBlockDivider = withAtomic(()=>{

    return (
        <div
            className="w-full mt-2 mb-2 p-0 border"
        />
    )
})
export const DividerBlockName = "Divider"
const Divider = withToggleButton(({
    className,
    editorState,
    onChange
}) => {
    const onmousedown = useCallback(() => {
        insertBlock(onChange, editorState, DividerBlockName, {});
    }, [editorState, onChange])
    return (
        <ToggleButton
            value="Divider"
            className={className}
            title="下划线"
            onMouseDown={onmousedown}
        >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 7.5C2 7.22386 2.22386 7 2.5 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H2.5C2.22386 8 2 7.77614 2 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
        </ToggleButton>
    )
})
export default Divider