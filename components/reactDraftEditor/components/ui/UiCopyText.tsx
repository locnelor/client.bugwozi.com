import { openInformationModal } from "@/components/ui/UiModal";
import { useCallback } from "react";


const UiCopyText = ({ context = "", label = "复制" }) => {
    const onCopy = useCallback(() => {
        try {
            window.navigator.clipboard.writeText(context)
                .then(() => {
                    openInformationModal(() => ({ children: "复制成功" }))
                })
        } catch (e) {
            openInformationModal(() => ({ title: "复制失败" }))
        }
    }, [context])
    return (
        <div onClick={onCopy} className="p-1 bg-base-100 absolute right-1 top-1 cursor-pointer rounded copyText">
            {label}
            <span className="hidden">
                {context}
            </span>
        </div>
    )
}
export default UiCopyText