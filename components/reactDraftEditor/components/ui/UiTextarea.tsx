import { forwardRef } from "react";
import classnames from 'classnames';

const UiTextarea = forwardRef<
    HTMLTextAreaElement,
    React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {

    return (
        <textarea
            {...props}

            className={classnames(
                "box-border min-h-96 w-full bg-blackA2 shadow-blackA6 inline-flex appearance-none items-center justify-center rounded-[4px] p-[10px] text-[15px] leading-none  shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6 resize-none",
                className
            )}
            ref={ref}
        />
    )
})
export default UiTextarea