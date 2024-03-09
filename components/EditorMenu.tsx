"use client"

import { EditorState, convertToRaw } from "draft-js";
import { MouseEvent, useCallback, useEffect, useMemo, useState } from "react"
type MenuType = {
    title: string,
    type: string,
    value: string,
    children: MenuType[]
}
const RenderStack = ({ stack = [] as MenuType[] }) => {
    const onClick = useCallback((e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
        e.preventDefault(); // 阻止默认的链接跳转行为
        const targetId = (e.target as any).getAttribute('href'); // 获取目标元素的 ID
        const targetElement = document.querySelector(targetId); // 获取目标元
        if (targetElement) {
            const headerHeight = 64; // header 的高度
            const scrollOffset = targetElement.offsetTop - headerHeight; // 目标元素位置 - header 高度
            window.scrollTo({
                top: scrollOffset,
                behavior: 'smooth'
            });
        }
    }, [])
    return (
        <ul className="menu">
            {stack.map(({ title, value, children }) => {
                return (
                    <li
                        key={value}
                    >
                        <a onClick={onClick} href={`#${value}`}>{title}</a>
                        <ul>
                            {children.map(({ title, value, children }) => (
                                <li key={value}>
                                    <a onClick={onClick} href={`#${value}`}>
                                        {title}
                                    </a>
                                    <ul>
                                        {children.map(({ title, value }) => (
                                            <li key={value}>
                                                <a onClick={onClick} href={`#${value}`}>
                                                    {title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}
export const RichEditorMenu = ({
    editorState = EditorState.createEmpty()
}) => {
    const menu = useMemo(() => {
        const stack: MenuType[] = [];
        const data = convertToRaw(editorState.getCurrentContent()).blocks
        const keys: { [k in string]: string } = {
            "header-one": "h1",
            "header-two": "h2",
            "header-three": "h3"
        }
        for (const item of data) {
            const hn = {
                title: item.text,
                type: keys[item.type],
                value: `${keys[item.type]}_${item.key}`,
                children: [],
            }
            if (item.type === "header-one") {
                stack.push(hn)
                continue;
            }
            if (item.type === "header-two") {
                const top = stack[stack.length - 1];
                if (!top || top.type != "h1") {
                    stack.push(hn)
                    continue;
                }
                top.children.push(hn);
                continue;
            }
            if (item.type === "header-three") {
                const top = stack[stack.length - 1];
                if (!top || top.type == "h3") {
                    stack.push(hn);
                    continue;
                }
                const children = top.children;
                const childrenTop = children[children.length - 1]
                if (!childrenTop || childrenTop.type === "h3") {
                    children.push(hn);
                    continue;
                }
                childrenTop.children.push(hn);
            }
        }
        return stack
    }, [editorState]);
    return <RenderStack stack={menu} />
}
const EditorMenu = () => {
    const [headers, setHeaders] = useState(Array.from(document.getElementsByTagName("h1")));

    const menu = useMemo(() => {
        const data = headers.map((elem) => {
            const [type, id] = elem.id.split("_");
            return { title: elem.innerText, id, type }
        }).filter(({ id }) => {
            return !!id
        })
        const stack: MenuType[] = []
        for (const item of data) {
            const hn = {
                title: item.title,
                type: item.type,
                value: `${item.type}_${item.id}`,
                children: [],
            }
            if (item.type === "h1") {
                stack.push(hn)
                continue;
            }
            if (item.type === "h2") {
                const top = stack[stack.length - 1];
                if (!top || top.type != "h1") {
                    stack.push(hn)
                    continue;
                }
                top.children.push(hn);
                continue;
            }
            if (item.type === "h3") {
                const top = stack[stack.length - 1];
                if (!top || top.type == "h3") {
                    stack.push(hn);
                    continue;
                }
                const children = top.children;
                const childrenTop = children[children.length - 1]
                if (!childrenTop || childrenTop.type === "h3") {
                    children.push(hn);
                    continue;
                }
                childrenTop.children.push(hn);
            }
        }
        return stack
    }, [headers])
    useEffect(() => {
        setHeaders(Array.from(document.getElementsByTagName("h1")))
    }, [])
    return <RenderStack stack={menu} />
}
export default EditorMenu
export type EditorMenuContextType = React.PropsWithChildren<{
    menu: React.ReactNode
}>
export const EditorMenuContext = ({
    children,
    menu
}: EditorMenuContextType) => {

    return (
        <div className="drawer drawer-end lg:drawer-open flex gap-2">
            <input id="context-drawer" type="checkbox" className="drawer-toggle" />
            <div style={{ maxWidth: 720 }} className="w-full drawer-content">
                <div className="drawer-content">
                    <label
                        htmlFor="context-drawer"
                        className="drawer-button btn btn-primary lg:hidden fixed bottom-0 right-0"
                    >
                        导航
                    </label>
                </div>
                <div>
                    {children}
                </div>
            </div>
            <div className="grow drawer-side z-30">
                <label htmlFor="context-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="min-h-full bg-base-100 pt-16">
                    <div className="text-lg text-center">文章导航</div>
                    {menu}
                </div>
            </div>

        </div>
    )
}