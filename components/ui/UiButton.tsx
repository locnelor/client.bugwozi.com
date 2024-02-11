import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef, useMemo } from "react";
import classnames from "classnames"
type Override<P, S> = Omit<P, keyof S> & S;

const UiButton = forwardRef<
    HTMLButtonElement,
    Override<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
        {
            loading?: boolean,
            type?: "neutral" | "primary" | "secondary" | "accent" | "ghost" | "link",
            submit?: boolean,
            reset?: boolean,
            size?: "lg" | "sm" | "xs"
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
    ...props
}, ref) => {
    const n = useMemo(() => {
        const arr = ["btn"];
        if (!!type) arr.push(`btn-${type}`)
        if (!!size) arr.push(`btn-size`);
        return arr.join(" ");
    }, [className])
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