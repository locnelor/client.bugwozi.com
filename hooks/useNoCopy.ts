"use client"

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
export const NoCopy = () => {
    useNoCopy()
    return null
}
export default useNoCopy