"use client"
import UiButton from "@/components/ui/UiButton"
import UiForm, { UiFormItem, UiFormSubmit } from "@/components/ui/UiForm"
import UiInput from "@/components/ui/UiInput"
import { Metadata } from "next"
import { useCallback } from "react"

// export const metadata: Metadata = {
//     title: "个人中心"
// }

const HomePage = () => {

    const onSubmit = useCallback((data: any) => {

    }, []);
    return (
        <UiForm className="min-w-80 max-w-96" onSubmit={onSubmit}>
            <UiFormItem
                valueMissing="请输入昵称"
                name="name"
                label="昵称"
            >
                <UiInput required />
            </UiFormItem>
            <UiFormItem
                name="test"
                label="test"
            >
                <UiInput required />
            </UiFormItem>
            <UiFormSubmit>
                <UiButton className="w-full">
                    保存
                </UiButton>
            </UiFormSubmit>
        </UiForm>
    )
}
export default HomePage