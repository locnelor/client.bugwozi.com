"use client"

import { createEmpty, createWithContent } from "@/components/reactDraftEditor/DraftRichEditor"
import { convertToRaw } from "draft-js"
import dynamic from "next/dynamic"
import { MouseEvent, useCallback, useMemo, useState } from "react"
import EditorFooter from "./EditorFooter"
import moment from "moment"
import { openInformationModal } from "./ui/UiModal"
import query from "@/lib/query"
import UserAvatar from "./UserAvatar"
import UserEntity from "@/interfaces/UserEntity"
const DraftRichEditor = dynamic(() => import("@/components/reactDraftEditor/DraftRichEditor"), { ssr: false })

type MenuType = {
    title: string,
    type: string,
    value: string,
    children: MenuType[]
}
type EditorMenuProps = {
    menu: MenuType[]
}
const EditorMenu = ({
    menu
}: EditorMenuProps) => {
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
            {menu.map(({ title, value, children }) => {
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
export type EditorContext = {
    context?: string,
    power?: boolean,
    updateAt?: string,
    savePath?: string,
    authors?: UserEntity[]
}
const EditorContext = ({
    context,
    savePath,
    power = false,
    updateAt,
    children,
    authors = []
}: React.PropsWithChildren<EditorContext>) => {
    const [readOnly, setReadOnly] = useState(true);
    const [loading, setLoading] = useState(false);
    const [editorState, setEditorState] = useState(() => {
        if (!!context) return createWithContent(context);
        return createEmpty()
    })
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

    const onSave = useCallback(() => {
        if (!savePath) return;
        setLoading(true);
        const context = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        query.post(savePath, { context })
            .then(() => openInformationModal(() => ({ title: "修改成功" })))
            .catch((e) => openInformationModal(() => ({ title: "修改失败", children: e.message })))
            .finally(() => setLoading(false));
    }, [editorState])

    return (
        <div className="drawer drawer-end lg:drawer-open">
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
                    <DraftRichEditor
                        editorState={editorState}
                        onChange={setEditorState}
                        readOnly={readOnly}
                    />
                </div>
                {!readOnly && <EditorFooter
                    editorState={editorState}
                    onChange={setEditorState}
                    onSave={onSave}
                    loading={loading}
                />}
                {children}
                <div>
                    <h1 className="text-xl">作者</h1>
                    <div className="flex flex-wrap gap-2">
                        {authors?.map((user) => (
                            <UserAvatar
                                key={user?.id}
                                user={user}
                            />
                        ))}
                    </div>
                </div>
                <div className="text-right">
                    最后一次编辑:{moment(updateAt).format("YYYY-MM-DD HH:mm:ss")}
                </div>
                {power && (
                    <div className="text-right">
                        <span
                            className="cursor-pointer underline"
                            onClick={() => setReadOnly(!readOnly)}
                        >
                            编辑此页
                        </span>
                    </div>
                )}
            </div>
            <div className="grow drawer-side z-30">
                <label htmlFor="context-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="min-h-full bg-base-100 pt-16">
                    <div className="text-lg text-center">文章导航</div>
                    <EditorMenu
                        menu={menu}
                    />
                </div>
            </div>
        </div>
    )
}
export default EditorContext