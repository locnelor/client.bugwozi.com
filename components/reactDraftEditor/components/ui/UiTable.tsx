import classNames from "classnames"
import { TableHTMLAttributes, forwardRef } from "react"


const UiTable = forwardRef<
    HTMLTableElement,
    TableHTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => {
    return (
        <table
            className={classNames(
                "table table-zebra",
                className
            )}
            {...props}
            ref={ref}
        />
    )
})
export default UiTable