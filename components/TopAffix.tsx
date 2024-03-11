"use client"
import { ToTop, TopicDiscussion } from "@icon-park/react";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react"

const TopAffix = () => {
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const showTopScroll = () => {
            if (!ref.current) return;
            if (window.scrollY > 64) {
                ref.current.style.opacity = "1"
            } else {
                ref.current.style.opacity = "0"
            }
        }
        window.addEventListener("scroll", showTopScroll)
        return () => window.removeEventListener("scroll", showTopScroll)
    }, []);
    const top = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);
    return (
        <div className="fixed right-1 bottom-1 lg:right-20 lg:bottom-20 flex flex-col gap-2">
            <div ref={ref} className="cursor-pointer opacity-0 duration-300" onClick={top}>
                <ToTop theme="outline" size="24" fill="#333" />
            </div>
            <Link target="_blank" href="https://support.qq.com/products/639696">
                <TopicDiscussion theme="outline" size="24" fill="#333" />
            </Link>
        </div>
    )
}
export default TopAffix