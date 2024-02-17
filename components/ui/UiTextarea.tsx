import { TextareaHTMLAttributes, forwardRef } from "react";
import classnames from "classnames"

const UiTextarea = forwardRef<
    HTMLTextAreaElement,
    TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {

    return (
        <textarea
            {...props}
            ref={ref}
            className={classnames(
                "textarea textarea-bordered w-full",
                className
            )}
        />
    )
})
UiTextarea.displayName = "UiTextarea"
export default UiTextarea