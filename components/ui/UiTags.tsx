import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react"
import UiButton from "./UiButton"
import UiInput from "./UiInput"


export type UiTagsProps = {
    value?: string[],
    // onChange?: (value: string[]) => void,
    // onClick?: (value: string) => void,
    readOnly?: boolean
}
const UiTags = forwardRef<HTMLInputElement, UiTagsProps>(({
    value = [],
    readOnly = false
}: UiTagsProps, ref) => {
    return (
        <div>

            <input
                className="hidden"
                ref={ref}
            />
        </div>
    )

    // const [tag, setTag] = useState("")
    // const [edit, setEdit] = useState(false);
    // const [values, setValues] = useState(value);
    // const onChange = useCallback((value: string[]) => {
    //     setValues(value);
    // }, [])
    // useEffect(() => {
    //     console.log(values, value)
    // }, [values, value])
    // const onClick = useCallback((value: string) => {

    // }, []);
    // const onBlur = useCallback(() => {
    //     setEdit(false);
    //     if (!tag) return;
    //     const data = new Set([...value, tag]);
    //     onChange([...data]);
    // }, [tag, value])
    // useImperativeHandle(ref, () => ({
    //     onChange,
    //     onClick
    // }))
    // return (
    //     <div className="flex flex-wrap gap-2">
    //         {value.map((e) => (
    //             <UiButton
    //                 onClick={onClick?.bind(null, e)}
    //                 key={e}
    //                 size="sm"
    //             >
    //                 {e}
    //                 <button
    //                     className="btn btn-square btn-sm"
    //                     onClick={() => console.log(e)}
    //                 >
    //                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
    //                 </button>
    //             </UiButton>
    //         ))}
    //         {!readOnly && <div>
    //             {edit && (
    //                 <UiInput
    //                     onChange={({ target: { value } }) => setTag(value)}
    //                     onBlur={onBlur}
    //                 />
    //             )}
    //             {!edit && (
    //                 <UiButton
    //                     type="secondary"
    //                     size="sm"
    //                     onClick={() => setEdit(true)}
    //                 >
    //                     新增
    //                 </UiButton>
    //             )}
    //         </div>}
    //     </div>
    // )
})
UiTags.displayName = "UiTags"
export default UiTags