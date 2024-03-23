import Draft, { CompositeDecorator, ContentBlock, DraftStyleMap, Editor, EditorState, Modifier, convertFromRaw } from "draft-js"
import { CSSProperties, createContext, useCallback, useEffect, useRef } from "react"
import Immutable from "immutable"
import { AtomicBlockImage, ImageBlockName } from "../components/AtomicImage";
import LinkDecorator from "../components/LinkDecorator";
import { AtomicBlockDivider, DividerBlockName } from "../components/AtomicDivider";
import { AtomicBlockCode, CodeBlockName } from "../components/AtomicCode";
import { AtomicBlockTable, TableBlockName } from "../components/AtomicTable";
import MathDecorator from "../components/MathDecorator";
import useDraftPatch from "../hooks/useDraftPatch";

export const DraftRichContext = createContext({
    mathBaseURL: "/math"
});


export const DraftRichProvider = DraftRichContext.Provider
export const DraftRichConsumer = DraftRichContext.Consumer
const HeaderOneWrapper = ({ children, type, ...props }: any) => {
    const ref = useRef<HTMLHeadingElement>(null);
    useEffect(() => {
        const id = type + "_" + props["data-offset-key"].split("-")[0]
        if (ref.current) ref.current.id = id;
    }, [children, type, props]);
    return (
        <h1 ref={ref} style={{ fontWeight: "bold" }} {...props} >
            {children}
        </h1>
    )
}
const styleMap: DraftStyleMap = {
    'TAG': {
        marginLeft: "5px",
        marginRight: "5px",
        background: "#000a2008",
        color: "#262626bf",
        borderRadius: "5px",
        borderWidth: "1px",
        padding: "2px"
    },
};
const blockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(Immutable.Map({
    "header-one": {
        wrapper: <HeaderOneWrapper type="h1" style={{ fontSize: "34px" }} />
    },
    "header-two": {
        wrapper: <HeaderOneWrapper type="h2" style={{ fontSize: "30px" }} />
    },
    "header-three": {
        wrapper: <HeaderOneWrapper type="h3" style={{ fontSize: "26px" }} />
    },
    blockquote: {
        wrapper: <div className="bg-base-200 pl-2 pr-2 border-l-2 border-blue-500" />
    }
}))
export type DraftRichEditorProps = {
    onChange: (editorState: EditorState) => void,
    editorState: EditorState,
    readOnly?: boolean,
}
const decorator = new CompositeDecorator([
    LinkDecorator,
    MathDecorator
])
export const createEmpty = () => {
    return EditorState.createEmpty(decorator)
}
export const createWithContent = (value: string) => {
    try {
        return EditorState.createWithContent(convertFromRaw(JSON.parse(value)), decorator)
    } catch (e) {
        console.log("parser error-", e);
        return createEmpty()
    }
}
const DraftRichEditor = (({
    editorState,
    onChange,
    readOnly = false
}: DraftRichEditorProps) => {
    const editorRef = useRef<Editor>(null);
    useDraftPatch({
        editorState,
        onChange,
        editorRef
    })
    useEffect(() => {
        if (!editorRef.current) return;
        if (!editorRef.current.editor) return;
        editorRef.current.editor.style.minHeight = "200px";
        editorRef.current.editor.id = "DraftEditor"
    }, []);
    const customStyleFn = useCallback((
        style: Draft.DraftInlineStyle
    ) => {
        const arr = style.toList().toArray()
        const result: CSSProperties = {};
        for (const value of arr) {
            const [name, type, color] = value.split("-")
            if (name === "color") {
                if (type === "color") {
                    result.color = color
                } else if (type === "background") {
                    result.backgroundColor = color;
                }
            }
        }
        return result;
    }, [])
    const blockStyleFn = useCallback((block: ContentBlock) => {
        const metaData = block.getData()
        const textAlign = metaData.get('align');
        let classes = [];
        if (!!textAlign) classes.push(`text-${textAlign}`);
        return classes.join(" ");
    }, []);
    const onTab = useCallback((e: React.KeyboardEvent<{}>) => {
        e.preventDefault();
        const newContentState = Modifier.replaceText(
            editorState.getCurrentContent(),
            editorState.getSelection(),
            "    "
        );
        onChange(
            EditorState.push(editorState, newContentState, "insert-characters")
        )
    }, [editorState, onChange]);
    const blockRendererFn = useCallback((block: ContentBlock) => {
        const blockType = block.getType();
        if (blockType === "atomic") {
            const entityKey = block.getEntityAt(0)
            if (!entityKey) return;
            const currentContent = editorState.getCurrentContent()
            const entity = currentContent.getEntity(entityKey);
            const entityType = entity.getType();
            const method = {
                editable: false,
                props: {
                    readOnly,
                    editorState,
                    onChange
                },
                component: null,
            } as any
            switch (entityType) {
                case ImageBlockName:
                    method.component = AtomicBlockImage;
                    break;
                case DividerBlockName:
                    method.component = AtomicBlockDivider;
                    break;
                case CodeBlockName:
                    method.component = AtomicBlockCode;
                    break;
                case TableBlockName:
                    method.component = AtomicBlockTable;
                    break;
                default:
                    return;
            }
            return method;
        }
    }, [editorState, readOnly, onChange]);
    return (
        <Editor
            editorState={editorState}
            onChange={onChange}
            customStyleMap={styleMap}
            onTab={onTab}
            ref={editorRef}
            blockRendererFn={blockRendererFn}
            customStyleFn={customStyleFn}
            blockRenderMap={blockRenderMap}
            blockStyleFn={blockStyleFn}
            readOnly={readOnly}
        />
    )
})
export default DraftRichEditor