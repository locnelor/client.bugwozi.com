"use client"

import UiButton from "@/components/ui/UiButton";
import UiForm, { UiFormData, UiFormItem, UiFormSubmit } from "@/components/ui/UiForm"
import UiInput from "@/components/ui/UiInput";
import { setCookie } from "@/lib/cookie";
import navigate from "@/lib/navigate";
import { useApolloClient, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useCallback, useState } from "react"

const AuthMutation = gql`
    mutation Auth($account:String!,$password:String!){
        auth(account:$account,password:$password){
            id
            token
        }
    }
`
const Auth = ({ searchParams: { back = "/" } }) => {
    const [error, setError] = useState<string>();
    const client = useApolloClient();
    const [auth, { loading }] = useMutation(AuthMutation, {
        onCompleted({ auth: { token } }) {
            setCookie("token", token);
            client.resetStore().then(() => {
                navigate(back);
            });
        },
        onError() {
            setError("账号或密码错误")
        },
    })
    const onSubmit = useCallback((variables: UiFormData) => {
        auth({
            variables
        })
    }, []);
    return (
        <UiForm
            onSubmit={onSubmit}
            onClearServerErrors={() => setError("")}
        >
            <UiFormItem
                label="账号"
                valueMissing="请输入账号"
                name="account"
            >
                <UiInput
                    required
                />
            </UiFormItem>
            <UiFormItem
                label="密码"
                match={(value) => value.length < 6}
                matchMessage="请输入至少6位密码"
                valueMissing="请输入密码"
                name="password"
                serverInvalid={error}
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
                使用<Link href="/auth" className="text-primary">邮箱</Link>登录
            </div>
        </UiForm>
    )
}
export default Auth