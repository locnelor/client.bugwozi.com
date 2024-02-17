import classNames from "classnames";
import { InputHTMLAttributes, forwardRef } from "react";


const UiImage = forwardRef<
    HTMLInputElement,
    InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {

    return (
        <div>
            <input
                className={classNames(
                    "file-input file-input-bordered w-full max-w-xs",
                    className
                )}
                {...props}
                type="file"
                accept="image/jpeg, image/png"
                ref={ref}
            />
        </div>
    )
});
UiImage.displayName = "UiImage"
export default UiImage;