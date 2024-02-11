import { DialogHTMLAttributes, forwardRef } from "react"


const UiModal = forwardRef<
    HTMLDialogElement,
    React.PropsWithChildren
>(({ children }, ref) => {
    return (
        <dialog
            className="modal"
            ref={ref}
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