"use client"
import { forwardRef, useCallback, useEffect, useRef, useState } from "react"
import UiButton from "./UiButton"
import UiInput from "./UiInput"


export type UiTagsProps = {
    defaultValue?: string,
    onClick?: (value: string) => void,
    readOnly?: boolean
}
const UiTags = forwardRef<HTMLInputElement, UiTagsProps>(({
    defaultValue,
    readOnly = false,
    onClick,
    ...rest
}: UiTagsProps, ref) => {
    const [tag, setTag] = useState("");
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState(() => defaultValue?.split(",") || []);
    const blurRef = useRef<HTMLInputElement>(null);
    const onBlur = useCallback(() => {
        setEdit(false)
        setTag("");
        if (!tag) return;
        const result = new Set([...data, tag]);
        setData([...result])
    }, [tag, data])
    const onFocus = useCallback(() => {
        setEdit(true);
    }, []);
    useEffect(() => {
        if (edit) blurRef.current?.focus()
    }, [edit])
    const onDel = useCallback((name: string) => {
        const result = new Set(data)
        result.delete(name);
        setData([...result])
    }, [data])
    return (
        <div className="flex flex-wrap gap-2">
            {data.map(((name, key) => (
                <div
                    key={key}
                    className="rounded pl-2 pt-1 pr-2 pb-1 bg-base-300"
                >
                    <span
                        className="cursor-pointer"
                        onClick={onClick?.bind(null, name)}
                    >
                        {name}
                    </span>
                    {
                        !readOnly && <svg onClick={onDel.bind(null, name)} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 cursor-pointer inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    }
                </div>
            )))}
            {!readOnly && (
                <div>
                    {edit && <UiInput
                        onBlur={onBlur}
                        value={tag}
                        onChange={({ target: { value } }) => setTag(value)}
                        ref={blurRef}
                        className="input-sm"
                    />}
                    {!edit && (
                        <UiButton
                            onClick={onFocus}
                            size="sm"
                        >
                            新增
                        </UiButton>
                    )}
                </div>
            )}
            <input
                ref={ref}
                {...rest}
                value={data.join(",")}
                className="hidden"
            />
        </div>
    )
})
UiTags.displayName = "UiTags"
export default UiTags