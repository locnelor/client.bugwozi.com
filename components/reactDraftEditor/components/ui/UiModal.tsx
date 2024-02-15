import { forwardRef } from "react"


const UiModal = forwardRef<
    HTMLDialogElement,
    React.DialogHTMLAttributes<HTMLDialogElement>
>(({ children, ...props }, ref) => {
    return (
        <dialog
            className="modal"
            ref={ref}
            {...props}
        >
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                {children}
            </div>
        </dialog>
    )
})
export const UiModalTitle = ({ children }: React.PropsWithChildren) => {
    return (
        <div className="mb-3 text-xl font-bold">
            {children}
        </div>
    )
}
export default UiModal