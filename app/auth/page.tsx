"use client"

import UiButton from "@/components/ui/UiButton";
import UiForm, { UiFormData, UiFormItem, UiFormSubmit } from "@/components/ui/UiForm"
import UiInput from "@/components/ui/UiInput";
import Link from "next/link";
import { useCallback, useState } from "react"



const Auth = ({ searchParams: { back = "/" } }) => {
    const [loading, setLoading] = useState(false);
    const onSubmit = useCallback((data: UiFormData) => {
        console.log(data)
    }, []);
    return (
        <UiForm onSubmit={onSubmit}>
            <UiFormItem
                label="邮箱地址"
                valueMissing="请输入邮箱地址"
                typeMismatch="请输入正确的邮箱地址"
                name="email"
            >
                <UiInput
                    type="email"
                    required
                />
            </UiFormItem>
            <UiFormItem
                label="密码"
                match={(value) => value.length < 6}
                matchMessage="请输入至少6位密码"
                valueMissing="请输入密码"
                name="password"
            >
                <UiInput type="password" required />
            </UiFormItem>
            <UiFormSubmit>
                <UiButton
                    loading={loading}
                    submit
                    className="block w-full"
                    type="primary"
                >
                    登录
                </UiButton>
            </UiFormSubmit>
            <div className="text-right">
                使用<Link href="/auth/account" className="text-primary">账号密码</Link>登录
            </div>
        </UiForm>
    )
}
export default Auth