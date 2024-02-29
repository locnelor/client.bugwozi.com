import classNames from "classnames";
import { DetailedHTMLProps, InputHTMLAttributes, forwardRef, useMemo } from "react";


const UiInput = forwardRef<
    HTMLInputElement,
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>(({ className, ...props }, ref) => {
    return (
        <input
            {...props}
            className={classNames(
                "input input-bordered w-full",
                className
            )}
            ref={ref}
        />
    )
})
UiInput.displayName = "UiInput"
export default UiInput