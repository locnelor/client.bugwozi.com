import { OptionHTMLAttributes, forwardRef } from "react"
import classNames from "classnames";
export type UiSelectProps = React.PropsWithChildren<{
    name?: string,
    className?: string
}>
const UiSelect = forwardRef<
    HTMLSelectElement,
    React.SelectHTMLAttributes<HTMLSelectElement>
>(({
    children,
    className,
    ...props
}: UiSelectProps, ref) => {
    return (
        <select
            ref={ref}
            className={
                classNames(
                    "select select-bordered w-full max-w-xs",
                    className
                )
            }
            {...props} >
            {children}
        </select>
    )
})
export const UiOption = forwardRef<
    HTMLOptionElement,
    OptionHTMLAttributes<HTMLOptionElement>
>(({
    children,
    className,
    ...props
}, forwardedRef) => {
    return (
        <option {...props} ref={forwardedRef}>
            {children}
        </option>
    )
});

export default UiSelect