import withToggleButton from "../hooks/withToggleButton"
import ToggleButton from "./ToggleButton"
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import UiModal, { UiModalTitle } from "./ui/UiModal"
import classNames from "classnames"
import UiButton from "./ui/UiButton"
import { insertText } from "../hooks/blockUtil"
import { DraftRichContext } from "../DraftRichEditor"


const items = [{
    icon: <svg viewBox="0 0 20 20"><path d="M6.09,15a1.45,1.45,0,0,1,.06-.56L7.27,11,4.43,8.88a1.39,1.39,0,0,1-.37-.41A.54.54,0,0,1,4,8a.59.59,0,0,1,.27-.33,1.17,1.17,0,0,1,.53-.1l3.47,0L9.36,4.16a1.18,1.18,0,0,1,.26-.49.51.51,0,0,1,.76,0,1.18,1.18,0,0,1,.26.49L11.7,7.63l3.48,0a1.15,1.15,0,0,1,.52.1A.63.63,0,0,1,16,8a.54.54,0,0,1,0,.43,1.16,1.16,0,0,1-.37.41L12.74,11l1.11,3.45a1.14,1.14,0,0,1,.06.56.56.56,0,0,1-.21.37.49.49,0,0,1-.41.1,1.2,1.2,0,0,1-.48-.24L10,13.09,7.19,15.25a1.2,1.2,0,0,1-.48.24.5.5,0,0,1-.41-.1A.66.66,0,0,1,6.09,15" fill="#777"></path></svg>,
    jaxs: [
        "{\\alpha} \\over {\\beta}",
        "\\alpha^\\beta",
        "\\sqrt {\\alpha}",
        "\\sqrt[\\beta] {\\alpha}",
        "\\int",
        "\\int\\limits_{\\alpha}^{\\beta}",
        "\\iint",
        "\\lim\\limits_{n \\to \\infty}",
        "\\pi",
        "\\alpha",
        "\\beta"
    ]
}]
const InlineMath = withToggleButton(({
    className,
    editorState,
    onChange
}) => {
    const ref = useRef<HTMLDialogElement>(null);
    const [index, setIndex] = useState(0);
    const [data, setData] = useState("");
    const [text, setText] = useState("");
    const { mathBaseURL } = useContext(DraftRichContext)

    useEffect(() => {
        const time = setTimeout(() => {
            setData(` $_start{ ${text} }end_$ `);
        }, 500)
        return () => clearTimeout(time);
    }, [text]);
    const onmousedown = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        ref.current?.showModal()
    }, [])
    const insertMath = useCallback((jax: string) => {
        setText(text + jax);
    }, [text]);
    const onFinish = useCallback(() => {
        insertText(onChange, editorState, ` $_start{ ${text} }end_$ `);

        setTimeout(() => {
            ref.current?.close()
        }, 100)

    }, [text, editorState, onChange])
    return (
        <>
            <UiModal
                ref={ref}
            >
                <UiModalTitle>添加公式</UiModalTitle>
                <div role="tablist" className="tabs tabs-bordered">
                    {items.map(({ icon }, key) => (
                        <a
                            key={key}
                            onClick={() => setIndex(key)}
                            role="tab"
                            className={classNames(
                                "tab",
                                key === index ? "tab-active" : ""
                            )}>
                            <div className="w-10">
                                {icon}
                            </div>
                        </a>
                    ))}
                </div>
                <div className="mt-2 mb-2">
                    {items.map(({ jaxs }, key) => (
                        <div
                            key={key}
                            className="flex flex-wrap gap-2"
                        >
                            {jaxs.map((jax, i) => (
                                <img
                                    src={`${mathBaseURL}?s=${encodeURI(jax)}`}
                                    key={i}
                                    alt=""
                                    className="cursor-pointer h-7"
                                    onMouseDown={insertMath.bind(null, jax)}
                                />
                            ))}
                        </div>
                    ))}
                </div>
                <div>
                    <textarea
                        className="textarea textarea-bordered w-full min-h-28"
                        placeholder="Bio"
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                </div>
                <div>
                    <img src={`${mathBaseURL}?s=${encodeURI(data.slice(8, data.length - 6))}`} alt="" />
                </div>
                <div className="flex justify-end">
                    <UiButton onClick={onFinish}>添加公式</UiButton>
                </div>
            </UiModal>
            <ToggleButton
                value="InlineMath"
                className={className}
                onMouseDown={onmousedown}
                title="数学"
            >
                <svg viewBox="64 64 896 896" focusable="false" data-icon="medium" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M834.7 279.8l61.3-58.9V208H683.7L532.4 586.4 360.3 208H137.7v12.9l71.6 86.6c7 6.4 10.6 15.8 9.7 25.2V673c2.2 12.3-1.7 24.8-10.3 33.7L128 805v12.7h228.6v-12.9l-80.6-98a39.99 39.99 0 01-11.1-33.7V378.7l200.7 439.2h23.3l172.6-439.2v349.9c0 9.2 0 11.1-6 17.2l-62.1 60.3V819h301.2v-12.9l-59.9-58.9c-5.2-4-7.9-10.7-6.8-17.2V297a18.1 18.1 0 016.8-17.2z"></path></svg>
            </ToggleButton>
        </>
    )
})

export default InlineMath