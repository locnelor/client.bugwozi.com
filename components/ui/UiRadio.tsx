import classNames from "classnames";
import { InputHTMLAttributes, forwardRef } from "react";


const UiRadio = forwardRef<
    HTMLInputElement,
    InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
    return (
        <input
            className={classNames(
                "radio",
                className
            )}
            {...props}
            type="radio"
            ref={ref}
        />
    )
})
export default UiRadio