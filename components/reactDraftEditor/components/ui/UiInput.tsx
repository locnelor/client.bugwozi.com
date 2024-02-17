import { DetailedHTMLProps, InputHTMLAttributes, forwardRef, useMemo } from "react";


const UiInput = forwardRef<
    HTMLInputElement,
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>((props, ref) => {
    const className = useMemo(() => "input input-bordered w-full " + props.className, [props.className]);
    return (
        <input
            {...props}
            className={className}
            ref={ref}
        />
    )
})
UiInput.displayName = "UiInput"
export default UiInput