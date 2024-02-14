import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef, useMemo } from "react";
import classnames from "classnames"
type Override<P, S> = Omit<P, keyof S> & S;

export type UiButtonColor = "info" | "success" | "warning" | "error"
const UiButton = forwardRef<
    HTMLButtonElement,
    Override<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
        {
            loading?: boolean,
            type?: "neutral" | "primary" | "secondary" | "accent" | "ghost" | "link",
            submit?: boolean,
            reset?: boolean,
            circle?: boolean,
            size?: "lg" | "sm" | "xs",
            color?: UiButtonColor
        }>
>(({
    loading,
    children,
    submit,
    reset,
    size,
    disabled,
    className,
    type,
    circle,
    color,
    ...props
}, ref) => {
    const n = useMemo(() => {
        const arr = ["btn"];
        if (!!type) arr.push(`btn-${type}`);
        if (!!size) arr.push(`btn-${size}`);
        if (!!circle) arr.push("btn-circle");
        if (!!color) arr.push(`btn-${color}`);
        return arr.join(" ");
    }, [className, type, size, circle, color])
    return (
        <button
            {...props}
            ref={ref}
            className={classnames(
                n,
                className
            )}
            type={!!submit ? "submit" : !!reset ? "reset" : "button"}
            disabled={!!loading || disabled}
        >
            {!!loading && (
                <span className="loading loading-spinner"></span>
            )}
            {children}
        </button>
    )
})
export default UiButton