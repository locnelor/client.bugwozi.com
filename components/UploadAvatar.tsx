"use client"
import { useCallback, useEffect, useRef, useState } from "react"
import useAvatarCanvas from "@/hooks/useAvatarCanvas"
import UiButton from "./ui/UiButton"


export type UploadAvatarProps = React.PropsWithChildren<{
    onUpload: (base64: string) => boolean | Promise<boolean>
}>
const UploadAvatar = ({
    children,
    onUpload
}: UploadAvatarProps) => {
    const ref = useRef<HTMLDialogElement>(null);
    const ref50 = useRef<HTMLCanvasElement>(null);
    const ref100 = useRef<HTMLCanvasElement>(null);
    const onCancel = useCallback(() => {
        ref.current?.close()
    }, []);
    const onClick = useCallback(() => {
        ref.current?.showModal();
    }, []);
    const { show, canvasRef, upd, onMoveDown, result } = useAvatarCanvas();
    useEffect(() => {
        if (!result) return;
        const img = new Image();
        img.src = result;
        img.onload = () => {
            if (!ref50.current) return;
            if (!ref100.current) return;
            const r50 = ref50.current.getContext("2d");
            const r100 = ref100.current.getContext("2d");
            if (!r100 || !r50) return;
            r50.clearRect(0, 0, 50, 50);
            r100.clearRect(0, 0, 100, 100);
            r50.drawImage(img, 0, 0, 50, 50);
            r100.drawImage(img, 0, 0, 100, 100);
        }
    }, [result])
    const clickInput = useCallback(() => {
        show()
    }, [])
    const wheel = useCallback((e: any) => {
        const { deltaY } = e;
        upd(deltaY < 0)
    }, [upd]);
    const onFinish = useCallback(() => {
        const p = onUpload(result.slice(result.indexOf(",") + 1));
        /**上传失败处理 */
        if (p instanceof Promise) {
            p.finally(() => {
                onCancel();
            });
        } else {
            onCancel()
        }
    }, [result])
    const add = useCallback(() => {
        upd(true)
    }, [upd])
    const sub = useCallback(() => {
        upd(false)
    }, [upd])
    return (
        <div className="flex justify-center items-center">
            <div className="rounded-full overflow-hidden relative" onClick={onClick}>
                {children}
                <div className="w-full absolute bottom-0 left-0 cursor-pointer text-center duration-300 bg-black text-white">更换头像</div>
            </div>
            <dialog
                ref={ref}
                className="modal"
            >
                <div className="modal-box">
                    <div className="flex w-full">
                        <div className="w-80 flex relative">
                            <canvas
                                width={300}
                                height={300}
                                className="w-80 h-80"
                                ref={canvasRef}
                            />
                            <div
                                onMouseDown={onMoveDown}
                                onWheel={wheel}
                                className="w-full h-full absolute top-0 left-0 bg-cover bg-center bg-no-repeat bg-[url('/upload-border.png')]"
                            />
                        </div>
                        <div className="w-32">
                            <div className="text-center">预览</div>
                            <div className="flex justify-center items-center">
                                <canvas ref={ref50} width={50} height={50}></canvas>
                            </div>
                            <div className="text-center">50x50</div>
                            <div className="h-5"></div>
                            <div className="flex justify-center items-center">
                                <canvas ref={ref100} width={100} height={100}></canvas>
                            </div>
                            <div className="text-center">100x100</div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex justify-center items-center gap-2 w-80">
                            <div onClick={add} className="mr-2 cursor-pointer font-bold text-2xl">
                                +
                            </div>
                            <div onClick={sub} className="ml-2 cursor-pointer font-bold text-2xl">
                                -
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-2 w-32">
                            <div
                                onClick={clickInput}
                                className="pr-4 cursor-pointer"
                            >
                                上传
                            </div>
                            <UiButton
                                onClick={onFinish}
                            >
                                确定
                            </UiButton>
                        </div>
                    </div>
                </div>
                <form onSubmit={onCancel} method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}
export default UploadAvatar