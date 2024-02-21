import { useContext, useEffect, useRef } from "react";
import { DraftRichContext } from "../DraftRichEditor";
import withDecorator from "../hooks/withDecorator";

export const SVGSend = ({
    src = ""
}) => {
    const ref = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        fetch(src).then(e => e.text()).then(e => {
            if (ref.current) ref.current.innerHTML = e
        })
    }, [src]);
    return (
        <span ref={ref}>

        </span>
    )
}
const MathDecorator = withDecorator(({
    decoratedText
}) => {
    const { mathBaseURL } = useContext(DraftRichContext)
    decoratedText = decoratedText.slice(8, decoratedText.length - 6)
    return (
        <span>
            &nbsp;
            <SVGSend
                src={`${mathBaseURL}?s=${decoratedText}`}
            />
            &nbsp;
        </span>
    )
}, (block, callback) => {
    const text = block.getText();
    let prefix = "$_start{";
    let preI = 0;
    let suffix = "}end_$";
    let sufI = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === prefix[preI]) {
            preI++;
            if (!prefix[preI]) {
                preI = 0;
                let j = i + 1;
                for (; j < text.length; j++) {
                    if (text[j] === suffix[sufI]) {
                        sufI++;
                        if (!suffix[sufI]) {
                            sufI = 0;
                            callback(i - 7, j + 1);
                            break;
                        }
                    } else {
                        sufI = 0;
                    }
                }
                i = j + 1;
            }
        } else {
            preI = 0;
        }
    }
})
export default MathDecorator