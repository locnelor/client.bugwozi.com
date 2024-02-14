import { HTMLAttributes, forwardRef } from "react";
import classnames from "classnames"


const UiDivider = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {

    return (
        <div
            ref={ref}
            className={classnames(
                "divider",
                className
            )}
            {...props}
        />
    )
})
export default UiDivider