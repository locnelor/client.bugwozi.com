import { openInformationModal } from "@/components/ui/UiModal";


export const gqlError = (error: any, title = "发生了一些错误") => openInformationModal(() => ({ title, children: error.message }))
export const gqlSuccess = (message = "操作成功") => openInformationModal(() => ({ children: message }));