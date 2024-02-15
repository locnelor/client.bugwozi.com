"use client"
import classNames from "classnames";
import { DialogHTMLAttributes, forwardRef, useCallback, useEffect, useRef, useState } from "react"
import { createRoot } from "react-dom/client"
import UiButton, { UiButtonColor } from "./UiButton";

export const useModalEvent = () => {
    const ref = useRef<HTMLDialogElement>(null);
    const open = useCallback(() => {
        ref.current?.showModal()
    }, []);
    const cancel = useCallback(() => ref.current?.close(), []);
    return [ref, open, cancel] as const
}
const UiModal = forwardRef<
    HTMLDialogElement,
    DialogHTMLAttributes<HTMLDialogElement>
>(({ children, className, ...props }, ref) => {
    return (
        <dialog
            className={
                classNames(
                    "modal",
                    className
                )
            }
            {...props}
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
export type UiModalConfirmFooterProps = {
    onOk: () => void | Promise<void>,
    onCancel: () => void,
    loading?: boolean,
    okText?: string,
    cancelText?: string,
    okColor?: UiButtonColor,
    cancelColor?: UiButtonColor
}
export const UiModalConfirmFooter = ({
    onOk,
    onCancel,
    okText = "确认",
    cancelText = "取消",
    okColor = "success",
    cancelColor = "info"
}: UiModalConfirmFooterProps) => {
    const [loading, setLoading] = useState(false);
    const onFinish = useCallback(async () => {
        setLoading(true);
        await onOk()
        setLoading(false);
    }, [onOk])
    return (
        <div className="flex justify-end gap-2">
            <UiButton
                onClick={onFinish}
                color={okColor}
                loading={loading}
            >
                {okText}
            </UiButton>
            <UiButton
                onClick={onCancel}
                color={cancelColor}
            >
                {cancelText}
            </UiButton>
        </div>
    )
}
export type OpenModalType = (destory: () => void) => React.PropsWithChildren<{
    title?: string,
    onOk?: () => boolean | Promise<boolean>,
    onCancel?: () => void,
    okText?: string,
    cancelText?: string
}>
export const openModal = (getProps: OpenModalType) => {
    const div = document.createElement("div");
    const root = createRoot(div)
    const destory = () => {
        root.unmount()
        document.body.removeChild(div)
    }
    const {
        title,
        children,
        onOk,
        onCancel,
        okText,
        cancelText
    } = getProps(destory);

    const Context = () => {
        const [ref, open, cancel] = useModalEvent();
        const cancelModal = useCallback(() => {
            if (!!onCancel) onCancel();
            destory();
        }, [onCancel]);
        const okModal = useCallback(async () => {
            if (!onOk) return destory();
            if (await onOk()) destory();
        }, [onOk]);
        useEffect(() => {
            open();
            return cancel
        }, [])
        return (
            <UiModal
                ref={ref}
                onCancel={cancelModal}
            >
                {!!title && (<UiModalTitle>{title}</UiModalTitle>)}
                {children}
                <UiModalConfirmFooter
                    onOk={okModal}
                    onCancel={cancelModal}
                    okText={okText}
                    cancelText={cancelText}
                />
            </UiModal>
        )
    }
    root.render(<Context />)
    document.body.appendChild(div);
    return destory
}

export const openInformationModal = (getProps: OpenModalType) => {
    const div = document.createElement("div");
    const root = createRoot(div)
    const destory = () => {
        root.unmount()
        document.body.removeChild(div)
    }
    const {
        title,
        children,
        onCancel,
        cancelText = "OK"
    } = getProps(destory);

    const Context = () => {
        const [ref, open, cancel] = useModalEvent();
        const cancelModal = useCallback(() => {
            if (!!onCancel) onCancel();
            destory();
        }, [onCancel]);
        useEffect(() => {
            open();
            return cancel
        }, [])
        return (
            <UiModal
                ref={ref}
                onCancel={cancelModal}
            >
                {!!title && (<UiModalTitle>{title}</UiModalTitle>)}
                {children}
                <div className="mt-2 flex justify-end">
                    <UiButton onClick={cancelModal}>{cancelText}</UiButton>
                </div>
            </UiModal>
        )
    }
    root.render(<Context />)
    document.body.appendChild(div);
    return destory
}