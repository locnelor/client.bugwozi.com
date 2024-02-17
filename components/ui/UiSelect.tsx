import classNames from "classnames";
import { SelectHTMLAttributes, forwardRef } from "react";


const UiSelect = forwardRef<
    HTMLSelectElement,
    SelectHTMLAttributes<HTMLSelectElement>
>(({
    className,
    ...props
}, ref) => {

    return (
        <select
            className={classNames(
                "select select-bordered w-full max-w-xs",
                className
            )}
            {...props}
            ref={ref}
        />
    )
})
UiSelect.displayName = "UiSelect"
export default UiSelect