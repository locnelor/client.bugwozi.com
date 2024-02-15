import withToggleButton from "../hooks/withToggleButton";
import ToggleButton from "./ToggleButton";
import { useCallback } from "react";
import useImage, { fileToCanvas } from "../hooks/useImage";
import { insertBlock } from "../hooks/blockUtil";
import withAtomic from "../hooks/withAtomic";

export const AtomicBlockImage = withAtomic<AtomicBlockImageData>(({
    data: {
        base64,
        url
    },
    // blockProps: {
    //     editorState,
    //     onChange,
    //     readOnly
    // }
}) => {
    // const onDoubleClick = useCallback(() => {
    //     if (readOnly) return;

    // }, [editorState, onChange, readOnly])
    return (
        <div
        // onDoubleClick={onDoubleClick}
        >
            <img src={!!url ? url : base64} alt="" />
        </div>
    )
})
export const ImageBlockName = "IMAGE"
export type AtomicBlockImageData = {
    base64: string,
    url: string,
    type: string
}
const AtomicImage = withToggleButton(({
    className,
    editorState,
    onChange
}) => {
    const open = useImage();
    const onmousedown = useCallback(() => {
        open().then((file) => {
            const name = file.name;
            const suffix = name.slice(name.lastIndexOf(".") + 1).toLowerCase();
            if (suffix === "gif") {
                // const reader = new FileReader();
                // reader.onload = ({ target: { result } }) => {
                //     insertBlock(onChange, editorState, imageBlockName, {
                //         type: "gif",
                //         base64: result
                //     })
                // }
                // reader.readAsDataURL(file)
            } else {
                fileToCanvas(file)
                    .then((canvas) => {
                        const base64 = canvas.toDataURL("jpg");
                        insertBlock(onChange, editorState, ImageBlockName, {
                            base64,
                            type: "image"
                        })
                    })
            }
        })
    }, [editorState, onChange, open]);
    return (
        <ToggleButton
            value={"Image"}
            className={className}
            onMouseDown={onmousedown}
            title="图片"
        >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 1H12.5C13.3284 1 14 1.67157 14 2.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V2.5C1 1.67157 1.67157 1 2.5 1ZM2.5 2C2.22386 2 2 2.22386 2 2.5V8.3636L3.6818 6.6818C3.76809 6.59551 3.88572 6.54797 4.00774 6.55007C4.12975 6.55216 4.24568 6.60372 4.32895 6.69293L7.87355 10.4901L10.6818 7.6818C10.8575 7.50607 11.1425 7.50607 11.3182 7.6818L13 9.3636V2.5C13 2.22386 12.7761 2 12.5 2H2.5ZM2 12.5V9.6364L3.98887 7.64753L7.5311 11.4421L8.94113 13H2.5C2.22386 13 2 12.7761 2 12.5ZM12.5 13H10.155L8.48336 11.153L11 8.6364L13 10.6364V12.5C13 12.7761 12.7761 13 12.5 13ZM6.64922 5.5C6.64922 5.03013 7.03013 4.64922 7.5 4.64922C7.96987 4.64922 8.35078 5.03013 8.35078 5.5C8.35078 5.96987 7.96987 6.35078 7.5 6.35078C7.03013 6.35078 6.64922 5.96987 6.64922 5.5ZM7.5 3.74922C6.53307 3.74922 5.74922 4.53307 5.74922 5.5C5.74922 6.46693 6.53307 7.25078 7.5 7.25078C8.46693 7.25078 9.25078 6.46693 9.25078 5.5C9.25078 4.53307 8.46693 3.74922 7.5 3.74922Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
        </ToggleButton >
    )
})
export default AtomicImage