import { DialogHTMLAttributes, forwardRef, useCallback, useEffect, useState } from "react"
import UiModal, { UiModalTitle } from "./ui/UiModal"
import UiForm, { UiFormItem, UiFormSubmit } from "./ui/UiForm"
import UiInput from "./ui/UiInput"
import UiButton from "./ui/UiButton"
import { gql, useMutation } from "@apollo/client"
import { gqlError } from "@/lib/apollo-error"

const GetPhoneCodeMutation = gql`
    mutation GetPhoneCode($phone:String!){
        getPhoneCode(phone:$phone){
            message
        }
    }

`
export type CodeItemProps = {
    phone: string,
    required?: boolean
}
export const CodeItem = forwardRef<
    HTMLInputElement,
    CodeItemProps
>(({ phone, required }, ref) => {
    const [count, setCount] = useState(0);
    const [getPhoneCode] = useMutation(GetPhoneCodeMutation, {
        onError(error) {
            gqlError(error)
        }
    })
    useEffect(() => {
        if (!count) return;
        const time = setTimeout(() => {
            setCount(count - 1);
        }, 1000)
        return () => clearTimeout(time)
    }, [count])
    const disabled = !(!count && phone.length === 11);
    const onClick = useCallback(() => {
        setCount(60);
        getPhoneCode({ variables: { phone } })
    }, [phone])
    return (
        <div className="flex gap-5">
            <UiInput
                ref={ref}
                required={required}
                minLength={6}
                maxLength={6}
            />
            <UiButton
                onClick={onClick}
                disabled={disabled}
                className="w-32"
            >
                {!!count ? count : "获取验证码"}
            </UiButton>
        </div>
    )
})
export type PhoneItemProps = {
    phone: string,
    setPhone: (phone: string) => void
}
export const PhoneItem = ({ phone, setPhone }: PhoneItemProps) => {
    return (
        <UiFormItem
            name="phone"
            label="手机号"
            valueMissing="手机号不得为空"
            typeMismatch="请输入11位手机号"
            match={value => !/^\d+$/.test(value)}
            matchMessage="手机号格式不合法"
        >
            <UiInput
                value={phone}
                onChange={({ target: { value } }) => setPhone(value)}
                required
                maxLength={11}
                minLength={11}
            />
        </UiFormItem>
    )
}
export const PhoneCodeItem = ({ phone = "" }) => {
    return (
        <UiFormItem
            name="code"
            label="验证码"
            typeMismatch="请输入6位验证码"
            valueMissing="验证码不得为空"
        >
            <CodeItem
                phone={phone}
                required
            />
        </UiFormItem>
    )
}
CodeItem.displayName = "CodeItem"
const PhoneCodeModal = forwardRef<
    HTMLDialogElement,
    DialogHTMLAttributes<HTMLDialogElement> & { onFinish: (data: { phone: string, code: string } & any) => void }
>(({ title, onFinish, ...props }, ref) => {
    const [phone, setPhone] = useState("");
    return (
        <UiModal
            ref={ref}
            {...props}
        >
            {!!title && <UiModalTitle>{title}</UiModalTitle>}
            <UiForm
                onSubmit={onFinish}
            >
                <PhoneItem
                    phone={phone}
                    setPhone={setPhone}
                />
                <PhoneCodeItem
                    phone={phone}
                />
                <UiFormSubmit>
                    <div className="flex justify-end">
                        <UiButton submit>提交</UiButton>
                    </div>
                </UiFormSubmit>
            </UiForm>
        </UiModal>
    )
})
PhoneCodeModal.displayName = "PhoneCodeModal"
export default PhoneCodeModal