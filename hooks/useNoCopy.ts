"use client"

import { openInformationModal } from "@/components/ui/UiModal";
import { useEffect } from "react";

const useNoCopy = () => {
    useEffect(() => {
        const NoCopy = (e: any) => {
            e.preventDefault();
        }
        document.addEventListener("copy", NoCopy)
        return () => document.removeEventListener("copy", NoCopy)
    }, []);
}
const useCopyCode = () => {
    useEffect(() => {
        if (typeof document === "undefined") return;
        const cards = Array.from(document.getElementsByClassName("copyText")) as HTMLDivElement[];
        cards.forEach(item => {
            item.onclick = () => {
                const child = item.getElementsByTagName("span")[0];
                if (!child) return;
                const text = child.innerText;
                try {
                    window.navigator.clipboard.writeText(text)
                        .then(() => {
                            openInformationModal(() => ({ children: "复制成功" }))
                        })
                } catch (e) {
                    openInformationModal(() => ({ title: "复制失败" }))
                }
            }
        })
    }, []);
}
export const NoCopy = () => {
    useNoCopy()
    useCopyCode()
    return null
}
export default useNoCopy