import { Popover, PopoverTrigger, PopoverPortal, PopoverContent } from "@radix-ui/react-popover";
import { RichUtils } from "draft-js";
import { useCallback } from "react";
import ToggleButton from "../components/ToggleButton";
import useCurrentStyle from "./useCurrentStyle";
import withToggleButton from "./withToggleButton";
const colors = [
    [
        null,
        "0D0016",
        "FE2C24",
        "FF9900",
        "FFD900",
        "A2E043",
        "38D8F0",
        "4DA8EE",
        "956FE7"
    ],
    [
        "F3F3F4",
        "CCCCCC",
        "FEF2F0",
        "FFF5E6",
        "FEFCD8",
        "EDF6E8",
        "E7FAFA",
        "EAF4FC",
        "EFEDF6"
    ],
    [
        "D7D8D9",
        "A5A5A5",
        "FBD4D0",
        "FFD7B9",
        "F9EDA6",
        "D4E9D5",
        "C7E6EA",
        "CBE0F1",
        "DAD5E9"
    ],
    [
        "7B7F82",
        "494949",
        "ED7976",
        "FAA572",
        "E6B223",
        "98C091",
        "79C6CD",
        "6EAAD7"
    ],
    [
        "9C8EC1",
        "333333",
        "BE191C",
        "B95514",
        "AD720D",
        "1C7331",
        "1C7892",
        "1A439C",
        "511B78"
    ]
]
export const withColor = (colorType: string, icon: any, title: string) => {
    return withToggleButton(({
        className,
        editorState,
        onChange
    }) => {
        const style = useCurrentStyle(editorState);
        const onMouseDown = useCallback((color: string, e: any) => {
            e.preventDefault();
            let state = editorState;
            const styleName = `color-${colorType}-#${color}`;
            if (!!style) {
                const list = style.toArray();
                // 消除多余样式
                for (const name of list) {
                    const [id, type] = name.split("-");
                    if (id === "color" && type === colorType && name !== styleName) {
                        state = RichUtils.toggleInlineStyle(state, name);
                    }
                }
            }
            if (!!color) state = RichUtils.toggleInlineStyle(state, styleName);
            onChange(state);
        }, [editorState, onChange, style]);
        return (
            <Popover >
                <PopoverTrigger asChild>
                    <ToggleButton title={title} className={className} value={colorType}>
                        {icon}
                    </ToggleButton>
                </PopoverTrigger>
                <PopoverPortal>
                    <PopoverContent
                        className="z-50 rounded p-5 w-[260px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
                        sideOffset={5}
                    >
                        <div className=""></div>
                        <div className="grid grid-cols-9 gap-1">
                            {colors.flat().map((color) => {
                                return (
                                    <ToggleButton
                                        value={color + ""}
                                        style={{
                                            background: `#${color}`
                                        }}
                                        key={color + ""}
                                        onMouseDown={onMouseDown.bind(null, color as string)}
                                        className={className}
                                    />
                                );
                            })}
                        </div>
                    </PopoverContent>
                </PopoverPortal>
            </Popover>
        )
    })
}