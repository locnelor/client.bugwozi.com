import classNames from "classnames";
import { HTMLAttributes, forwardRef } from "react";


export const UiCardTitle = forwardRef<
    HTMLHeadingElement,
    HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {

    return (
        <h2
            {...props}
            className={classNames(
                "card-title",
                className
            )}
            ref={ref}
        />
    )
})
export const UiCardFigure = forwardRef<
    HTMLElement,
    HTMLAttributes<HTMLElement>
>(({ ...props }, ref) => {
    return (
        <figure
            {...props}
            ref={ref}
        />
    )
})
export const UiCardBody = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {

    return (
        <div
            {...props}
            className={classNames(
                "card-body",
                className
            )}
            ref={ref}
        />
    )
})
export const UiCardActions = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {

    return (
        <div
            {...props}
            className={classNames(
                "card-actions justify-end",
                className
            )}
            ref={ref}
        />
    )
})
const UiCard = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            {...props}
            className={classNames(
                "card shadow-lg hover:shadow-xl",
                className
            )}
        />
    )
})
export default UiCard