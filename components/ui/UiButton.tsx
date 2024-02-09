import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from "react";
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
>(({ loading, children, submit, reset, size, disabled, className, type, ...props }, ref) => {
    return (
        <button
            {...props}
            ref={ref}
            className={`btn ${!!type ? `btn-${type}` : ""} ${!!size ? `btn-${size}` : ""} ${className}`}
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