
import { Toolbar, ToolbarSeparator, ToolbarToggleItem } from "@radix-ui/react-toolbar"
import { EditorState, RichUtils } from "draft-js"
import { ToggleButtonEditorPtops, ToggleGroupButton } from "../components/ToggleButton"
import withInlineStyle from "../hooks/withInlineStyle"
import withBlockStyle from "../hooks/withBlockStyle"
import withBlockType from "../hooks/withBlockType"
import { withColor } from "../hooks/withColor"
import AtomicImage from "../components/AtomicImage"
import Link from "../components/Link"
import Divider from "../components/AtomicDivider"
import Code from "../components/AtomicCode"
import Table from "../components/AtomicTable"
import InlineMath from "../components/InlineMath"
import classNames from "classnames"
import { Quote, TextItalic } from "@icon-park/react"
import { useEffect } from "react"
import { setBlockData } from "../hooks/useCurrentBlocksMetadata"


export const ToolbarSet: { [k in string]: (props: ToggleButtonEditorPtops) => JSX.Element } = {
    Bold: withInlineStyle(() => (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.10505 12C4.70805 12 4.4236 11.912 4.25171 11.736C4.0839 11.5559 4 11.2715 4 10.8827V4.11733C4 3.72033 4.08595 3.43588 4.25784 3.26398C4.43383 3.08799 4.71623 3 5.10505 3C6.42741 3 8.25591 3 9.02852 3C10.1373 3 11.0539 3.98153 11.0539 5.1846C11.0539 6.08501 10.6037 6.81855 9.70327 7.23602C10.8657 7.44851 11.5176 8.62787 11.5176 9.48128C11.5176 10.5125 10.9902 12 9.27734 12C8.77742 12 6.42626 12 5.10505 12ZM8.37891 8.00341H5.8V10.631H8.37891C8.9 10.631 9.6296 10.1211 9.6296 9.29877C9.6296 8.47643 8.9 8.00341 8.37891 8.00341ZM5.8 4.36903V6.69577H8.17969C8.53906 6.69577 9.27734 6.35939 9.27734 5.50002C9.27734 4.64064 8.48047 4.36903 8.17969 4.36903H5.8Z" fill="currentColor"></path></svg>
    ), "BOLD", "加粗"),
    Italic: withInlineStyle(() => (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.67494 3.50017C5.67494 3.25164 5.87641 3.05017 6.12494 3.05017H10.6249C10.8735 3.05017 11.0749 3.25164 11.0749 3.50017C11.0749 3.7487 10.8735 3.95017 10.6249 3.95017H9.00587L7.2309 11.05H8.87493C9.12345 11.05 9.32493 11.2515 9.32493 11.5C9.32493 11.7486 9.12345 11.95 8.87493 11.95H4.37493C4.1264 11.95 3.92493 11.7486 3.92493 11.5C3.92493 11.2515 4.1264 11.05 4.37493 11.05H5.99397L7.76894 3.95017H6.12494C5.87641 3.95017 5.67494 3.7487 5.67494 3.50017Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
    ), "ITALIC", "倾斜"),
    Underline: withInlineStyle(() => (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.00001 2.75C5.00001 2.47386 4.77615 2.25 4.50001 2.25C4.22387 2.25 4.00001 2.47386 4.00001 2.75V8.05C4.00001 9.983 5.56702 11.55 7.50001 11.55C9.43301 11.55 11 9.983 11 8.05V2.75C11 2.47386 10.7762 2.25 10.5 2.25C10.2239 2.25 10 2.47386 10 2.75V8.05C10 9.43071 8.88072 10.55 7.50001 10.55C6.1193 10.55 5.00001 9.43071 5.00001 8.05V2.75ZM3.49998 13.1001C3.27906 13.1001 3.09998 13.2791 3.09998 13.5001C3.09998 13.721 3.27906 13.9001 3.49998 13.9001H11.5C11.7209 13.9001 11.9 13.721 11.9 13.5001C11.9 13.2791 11.7209 13.1001 11.5 13.1001H3.49998Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
    ), "UNDERLINE", "下划线"),
    Strikethrough: withInlineStyle(() => (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.00003 3.25C5.00003 2.97386 4.77617 2.75 4.50003 2.75C4.22389 2.75 4.00003 2.97386 4.00003 3.25V7.10003H2.49998C2.27906 7.10003 2.09998 7.27912 2.09998 7.50003C2.09998 7.72094 2.27906 7.90003 2.49998 7.90003H4.00003V8.55C4.00003 10.483 5.56703 12.05 7.50003 12.05C9.43303 12.05 11 10.483 11 8.55V7.90003H12.5C12.7209 7.90003 12.9 7.72094 12.9 7.50003C12.9 7.27912 12.7209 7.10003 12.5 7.10003H11V3.25C11 2.97386 10.7762 2.75 10.5 2.75C10.2239 2.75 10 2.97386 10 3.25V7.10003H5.00003V3.25ZM5.00003 7.90003V8.55C5.00003 9.93071 6.11932 11.05 7.50003 11.05C8.88074 11.05 10 9.93071 10 8.55V7.90003H5.00003Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
    ), "STRIKETHROUGH", "删除线"),
    Tag: withInlineStyle(() => (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.00003 3.25C5.00003 2.97386 4.77617 2.75 4.50003 2.75C4.22389 2.75 4.00003 2.97386 4.00003 3.25V7.10003H2.49998C2.27906 7.10003 2.09998 7.27912 2.09998 7.50003C2.09998 7.72094 2.27906 7.90003 2.49998 7.90003H4.00003V8.55C4.00003 10.483 5.56703 12.05 7.50003 12.05C9.43303 12.05 11 10.483 11 8.55V7.90003H12.5C12.7209 7.90003 12.9 7.72094 12.9 7.50003C12.9 7.27912 12.7209 7.10003 12.5 7.10003H11V3.25C11 2.97386 10.7762 2.75 10.5 2.75C10.2239 2.75 10 2.97386 10 3.25V7.10003H5.00003V3.25ZM5.00003 7.90003V8.55C5.00003 9.93071 6.11932 11.05 7.50003 11.05C8.88074 11.05 10 9.93071 10 8.55V7.90003H5.00003Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
    ), "TAG", "标签"),
    Left: withBlockStyle(() => (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 4.5C2 4.22386 2.22386 4 2.5 4H12.5C12.7761 4 13 4.22386 13 4.5C13 4.77614 12.7761 5 12.5 5H2.5C2.22386 5 2 4.77614 2 4.5ZM4 7.5C4 7.22386 4.22386 7 4.5 7H10.5C10.7761 7 11 7.22386 11 7.5C11 7.77614 10.7761 8 10.5 8H4.5C4.22386 8 4 7.77614 4 7.5ZM3 10.5C3 10.2239 3.22386 10 3.5 10H11.5C11.7761 10 12 10.2239 12 10.5C12 10.7761 11.7761 11 11.5 11H3.5C3.22386 11 3 10.7761 3 10.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
    ), "left",
        (e) => e.get("align") === "left",
        { align: "left" },
        "左对齐"
    ),
    Center: withBlockStyle(() => (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 4.5C2 4.22386 2.22386 4 2.5 4H12.5C12.7761 4 13 4.22386 13 4.5C13 4.77614 12.7761 5 12.5 5H2.5C2.22386 5 2 4.77614 2 4.5ZM4 7.5C4 7.22386 4.22386 7 4.5 7H10.5C10.7761 7 11 7.22386 11 7.5C11 7.77614 10.7761 8 10.5 8H4.5C4.22386 8 4 7.77614 4 7.5ZM3 10.5C3 10.2239 3.22386 10 3.5 10H11.5C11.7761 10 12 10.2239 12 10.5C12 10.7761 11.7761 11 11.5 11H3.5C3.22386 11 3 10.7761 3 10.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
    ), "center",
        (e) => e.get("align") === "center",
        { align: "center" },
        "居中对齐"
    ),
    Right: withBlockStyle(() => (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 4.5C2 4.22386 2.22386 4 2.5 4H12.5C12.7761 4 13 4.22386 13 4.5C13 4.77614 12.7761 5 12.5 5H2.5C2.22386 5 2 4.77614 2 4.5ZM4 7.5C4 7.22386 4.22386 7 4.5 7H10.5C10.7761 7 11 7.22386 11 7.5C11 7.77614 10.7761 8 10.5 8H4.5C4.22386 8 4 7.77614 4 7.5ZM3 10.5C3 10.2239 3.22386 10 3.5 10H11.5C11.7761 10 12 10.2239 12 10.5C12 10.7761 11.7761 11 11.5 11H3.5C3.22386 11 3 10.7761 3 10.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
    ), "right",
        (e) => e.get("align") === "right",
        { align: "right" },
        "右对齐"
    ),
    HeaderOne: withBlockType(() => (
        <span>H1</span>
    ), "header-one", "标题1"),
    HeaderTwo: withBlockType(() => (
        <span>H2</span>
    ), "header-two", "标题2"),
    HeaderThree: withBlockType(() => (
        <span>H3</span>
    ), "header-three", "标题3"),
    Blockquote: withBlockType(() => (
        <span>
            <Quote />
        </span>
    ), "blockquote", "引用"),
    OrderedList: withBlockType(() => (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 5.25C1.91421 5.25 2.25 4.91421 2.25 4.5C2.25 4.08579 1.91421 3.75 1.5 3.75C1.08579 3.75 0.75 4.08579 0.75 4.5C0.75 4.91421 1.08579 5.25 1.5 5.25ZM4 4.5C4 4.22386 4.22386 4 4.5 4H13.5C13.7761 4 14 4.22386 14 4.5C14 4.77614 13.7761 5 13.5 5H4.5C4.22386 5 4 4.77614 4 4.5ZM4.5 7C4.22386 7 4 7.22386 4 7.5C4 7.77614 4.22386 8 4.5 8H13.5C13.7761 8 14 7.77614 14 7.5C14 7.22386 13.7761 7 13.5 7H4.5ZM4.5 10C4.22386 10 4 10.2239 4 10.5C4 10.7761 4.22386 11 4.5 11H13.5C13.7761 11 14 10.7761 14 10.5C14 10.2239 13.7761 10 13.5 10H4.5ZM2.25 7.5C2.25 7.91421 1.91421 8.25 1.5 8.25C1.08579 8.25 0.75 7.91421 0.75 7.5C0.75 7.08579 1.08579 6.75 1.5 6.75C1.91421 6.75 2.25 7.08579 2.25 7.5ZM1.5 11.25C1.91421 11.25 2.25 10.9142 2.25 10.5C2.25 10.0858 1.91421 9.75 1.5 9.75C1.08579 9.75 0.75 10.0858 0.75 10.5C0.75 10.9142 1.08579 11.25 1.5 11.25Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
    ), "ordered-list-item", "有序列表"),
    UnorderedList: withBlockType(() => (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
    ), "unordered-list-item", "无序列表"),
    Color: withColor("color",
        <svg viewBox="64 64 896 896" focusable="false" data-icon="font-colors" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M904 816H120c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8zm-650.3-80h85c4.2 0 8-2.7 9.3-6.8l53.7-166h219.2l53.2 166c1.3 4 5 6.8 9.3 6.8h89.1c1.1 0 2.2-.2 3.2-.5a9.7 9.7 0 006-12.4L573.6 118.6a9.9 9.9 0 00-9.2-6.6H462.1c-4.2 0-7.9 2.6-9.2 6.6L244.5 723.1c-.4 1-.5 2.1-.5 3.2-.1 5.3 4.3 9.7 9.7 9.7zm255.9-516.1h4.1l83.8 263.8H424.9l84.7-263.8z"></path></svg>,
        "字体颜色"
    ),
    BgColor: withColor("background",
        <svg viewBox="64 64 896 896" focusable="false" data-icon="bg-colors" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M766.4 744.3c43.7 0 79.4-36.2 79.4-80.5 0-53.5-79.4-140.8-79.4-140.8S687 610.3 687 663.8c0 44.3 35.7 80.5 79.4 80.5zm-377.1-44.1c7.1 7.1 18.6 7.1 25.6 0l256.1-256c7.1-7.1 7.1-18.6 0-25.6l-256-256c-.6-.6-1.3-1.2-2-1.7l-78.2-78.2a9.11 9.11 0 00-12.8 0l-48 48a9.11 9.11 0 000 12.8l67.2 67.2-207.8 207.9c-7.1 7.1-7.1 18.6 0 25.6l255.9 256zm12.9-448.6l178.9 178.9H223.4l178.8-178.9zM904 816H120c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8z"></path></svg>,
        "背景颜色"
    ),
    Image: AtomicImage,
    Link,
    Divider,
    Code,
    Table,
    Math: InlineMath
}
export const ToolbarList = [
    ["Bold", "Italic", "Underline", "Strikethrough", "Tag"],
    "|",
    ["Left", "Center", "Right"],
    "|",
    ["HeaderOne", "HeaderTwo", "HeaderThree", "Blockquote", "OrderedList", "UnorderedList"],
    "|",
    ["Color", "BgColor", "Image", "Link"],
    "|",
    ["Divider", "Code", "Table", "Math"]
]
export type DraftToolbarProps = React.PropsWithChildren<{
    editorState: EditorState,
    onChange: (editorState: EditorState) => void,
    list?: (string | string[])[],
    ToolbarItemClassName?: string,
    ToolbarCheckClassName?: string,
    className?: string
    type: string,
    hash_key: string
}>
const DraftToolbar = ({
    editorState,
    onChange,
    list = ToolbarList,
    ToolbarItemClassName = "flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center ml-0.5 outline-none hover:bg-violet3 hover:text-violet11",
    ToolbarCheckClassName = "flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white ml-0.5 outline-none bg-violet4 text-violet11 hover:bg-violet3 hover:text-violet11",
    className,
    children,
    type,
    hash_key
}: DraftToolbarProps) => {
    useEffect(() => {
        const keyDown = (e: KeyboardEvent) => {
            const ctrlKey = e.ctrlKey || e.metaKey;
            const bKey = e.key === 'b';
            const cKey = e.key === 'c';
            const iKey = e.key === 'i';
            if (ctrlKey && bKey) {
                onChange(RichUtils.toggleInlineStyle(
                    editorState,
                    "BOLD"
                ))
            }
            if (ctrlKey && iKey) {
                onChange(RichUtils.toggleInlineStyle(
                    editorState,
                    "ITALIC"
                ))
            }
            if (ctrlKey && cKey) {
                onChange(setBlockData(editorState, { align: "center" }))
            }
        }
        document.addEventListener("keydown", keyDown)
        return () => document.removeEventListener("keydown", keyDown)
    }, [editorState, onChange]);
    return (
        <Toolbar
            className={classNames(
                "flex p-[10px] w-full min-w-max rounded-md  shadow-[0_2px_10px] shadow-blackA4",
                className
            )}
        >
            {list.map((blockType, key) => {
                if (typeof blockType === "string") {
                    return (
                        <ToolbarSeparator
                            key={key}
                            className="w-[1px] bg-mauve6 mx-[10px]"
                        />
                    )
                }
                return (
                    <ToggleGroupButton key={key} type="multiple">
                        {blockType.map((v, k) => {
                            const Item = ToolbarSet[v];
                            const id = `${key}_${k}`;
                            if (!!Item) {
                                return (
                                    <Item
                                        key={id}
                                        editorState={editorState}
                                        onChange={onChange}
                                        checkClassName={ToolbarCheckClassName}
                                        className={ToolbarItemClassName}
                                        type={type}
                                        hash_key={hash_key}
                                    />
                                )
                            }
                            return (
                                <ToolbarToggleItem
                                    className={ToolbarItemClassName}
                                    value={id}
                                    key={id}
                                >
                                    <TextItalic />
                                </ToolbarToggleItem>
                            )
                        })}
                    </ToggleGroupButton>
                )
            })}
            {children}
        </Toolbar >
    )
}
export default DraftToolbar