"use client"
import { PhoneCodeItem, PhoneItem } from "@/components/PhoneCodeModal"
import UiButton from "@/components/ui/UiButton"
import UiForm, { UiFormItem, UiFormSubmit } from "@/components/ui/UiForm"
import UiInput from "@/components/ui/UiInput"
import UiModal, { UiModalTitle, openInformationModal, useModalEvent } from "@/components/ui/UiModal"
import UiTabs, { UiTabsItem } from "@/components/ui/UiTabs"
import { gqlError } from "@/lib/apollo-error"
import { gql, useApolloClient, useMutation } from "@apollo/client"
import { useCallback, useState } from "react"


const UpdPwdMutation = gql`
    mutation UpdPwd($oldPassword:String!,$password:String!){
        updPwd(oldPassword:$oldPassword,password:$password){
            message
        }
    }
`
const UpdPwdForCodeMutation = gql`
    mutation UpdPwdForCode($phone:String!,$password:String!,$code:String){
        updPwdForCode(phone:$phone,password:$password,code:$code){
            message
        }
    }
`

const AccountPassword = () => {
    const [modalRef, open, cancel] = useModalEvent()
    const [phone, setPhone] = useState("");
    const client = useApolloClient()
    const [updPwd, { loading }] = useMutation(UpdPwdMutation, {
        onError(error) {
            gqlError(error)
        },
        onCompleted() {
            client.resetStore().finally(() => {
                window.location.href = `/auth?back=${encodeURI("/home/")}`
            })
        }
    })
    const [updPwdForCode, { loading: updPwdForCodeLoading }] = useMutation(UpdPwdForCodeMutation, {
        onError(error) {
            gqlError(error)
        },
        onCompleted() {
            client.resetStore().finally(() => {
                window.location.href = `/auth?back=${encodeURI("/home/")}`
            })
        }
    })
    const onPwdSubmit = useCallback(({
        oldPassword,
        password,
        confirmPassword
    }: any) => {
        if (password !== confirmPassword) return openInformationModal(() => ({ title: "两次密码不一致" }))
        updPwd({ variables: { oldPassword, password } })
    }, []);
    const onPhoneSubmit = useCallback(({
        password,
        confirmPassword,
        phone,
        code
    }: any) => {
        if (password !== confirmPassword) return openInformationModal(() => ({ title: "两次密码不一致" }))
        updPwdForCode({
            variables: {
                password,
                phone,
                code
            }
        })
    }, [])
    return (
        <div className="mt-5 mb-5">
            <div className="font-bold">登录密码</div>
            <div className="flex max-w-96 gap-5">
                <UiInput value="123456" type="password" disabled />
                <UiButton onClick={open}>
                    修改密码
                </UiButton>
                <UiModal
                    ref={modalRef}
                >
                    <UiModalTitle>修改密码</UiModalTitle>
                    <UiTabs>
                        <UiTabsItem
                            name="旧密码修改"
                        >
                            <UiForm
                                onSubmit={onPwdSubmit}
                            >
                                <UiFormItem
                                    name="oldPassword"
                                    label="旧密码"
                                    typeMismatch="密码长度至少6位"
                                    valueMissing="请输入旧密码"
                                >
                                    <UiInput
                                        required
                                        minLength={6}
                                    />
                                </UiFormItem>
                                <UiFormItem
                                    name="password"
                                    label="新密码"
                                    typeMismatch="密码长度至少6位"
                                    valueMissing="请输入新密码"
                                >
                                    <UiInput
                                        required
                                        minLength={6}
                                    />
                                </UiFormItem>
                                <UiFormItem
                                    name="confirmPassword"
                                    label="确认密码"
                                    typeMismatch="密码长度至少6位"
                                    valueMissing="请输入新密码"
                                >
                                    <UiInput
                                        required
                                        minLength={6}
                                    />
                                </UiFormItem>
                                <UiFormSubmit>
                                    <div className="flex justify-end">
                                        <UiButton loading={loading} submit>提交</UiButton>
                                    </div>
                                </UiFormSubmit>
                            </UiForm>
                        </UiTabsItem>
                        <UiTabsItem
                            name="短信验证码修改"
                        >
                            <UiForm
                                onSubmit={onPhoneSubmit}
                            >
                                <UiFormItem
                                    name="password"
                                    label="新密码"
                                    typeMismatch="密码长度至少6位"
                                    valueMissing="请输入密码"
                                >
                                    <UiInput
                                        required
                                        minLength={6}
                                    />
                                </UiFormItem>
                                <UiFormItem
                                    name="confirmPassword"
                                    label="确认密码"
                                    typeMismatch="密码长度至少6位"
                                    valueMissing="请输入密码"
                                >
                                    <UiInput
                                        required
                                        minLength={6}
                                    />
                                </UiFormItem>
                                <PhoneItem
                                    phone={phone}
                                    setPhone={setPhone}
                                />
                                <PhoneCodeItem
                                    phone={phone}
                                />
                                <UiFormSubmit>
                                    <div className="flex justify-end">
                                        <UiButton loading={updPwdForCodeLoading} submit>提交</UiButton>
                                    </div>
                                </UiFormSubmit>
                            </UiForm>
                        </UiTabsItem>
                    </UiTabs>
                </UiModal>
            </div>
        </div>
    )
}
export default AccountPassword