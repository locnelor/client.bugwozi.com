import { useState } from "react"
import UiButton from "./UiButton"


export type UiButtonRadiosProps = {
    options: { label: string, value: string }[],
    value?: string,
    onChange?: (value: string) => void
}
const UiButtonRadios = ({
    options,
    value,
    onChange
}: UiButtonRadiosProps) => {

    return (
        <div className="flex flex-wrap gap-2">
            {options.map(({ label, value: v }, key) => (
                <UiButton
                    key={key}
                    onClick={onChange?.bind(null, v)}
                    type={value === v ? "primary" : "ghost"}
                    size="sm"
                >
                    {label}
                </UiButton>
            ))}
        </div>
    )
}
export default UiButtonRadios