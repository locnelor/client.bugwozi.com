import { DialogHTMLAttributes, forwardRef, useCallback, useEffect, useState } from "react"
import UiModal, { UiModalTitle } from "./ui/UiModal"
import UiForm, { UiFormItem, UiFormSubmit } from "./ui/UiForm"
import UiInput from "./ui/UiInput"
import UiButton from "./ui/UiButton"
import { gql, useMutation } from "@apollo/client"
import { gqlError } from "@/lib/apollo-error"

const GetPhoneCodeMutation = gql`
    mutation GetPhoneCode($phone:String!,$equal:Boolean){
        getPhoneCode(phone:$phone,equal:$equal){
            message
        }
    }

`
const GetSelfCodeMutation = gql`
    mutation GetSelfCode{
        getSelfCode{
            message
        }
    }
`
export type CodeItemProps = {
    phone: string,
    required?: boolean,
    equal?: boolean
}
export const CodeItem = forwardRef<
    HTMLInputElement,
    CodeItemProps
>(({ phone, required, equal = false, ...rest }, ref) => {
    const [count, setCount] = useState(0);
    const [getPhoneCode] = useMutation(GetPhoneCodeMutation, {
        onError(error) {
            gqlError(error)
            setCount(0)
        },
        onCompleted() {
            setCount(60)
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
        getPhoneCode({ variables: { phone, equal } })
    }, [phone, equal])
    return (
        <div className="flex gap-5">
            <UiInput
                ref={ref}
                required={required}
                minLength={6}
                maxLength={6}
                {...rest}
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
    equal?: boolean,
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
export const SelfPhoneCode = forwardRef<
    HTMLInputElement
>((props, ref) => {
    const [count, setCount] = useState(0);
    const [getPhoneCode] = useMutation(GetSelfCodeMutation, {
        onError(error) {
            gqlError(error)
            setCount(0)
        },
        onCompleted() {
            setCount(60)
        }
    })
    useEffect(() => {
        if (!count) return;
        const time = setTimeout(() => {
            setCount(count - 1);
        }, 1000)
        return () => clearTimeout(time)
    }, [count])
    const onClick = useCallback(() => {
        getPhoneCode()
    }, [])
    return (
        <div className="flex gap-5">
            <UiInput
                ref={ref}
                required
                minLength={6}
                maxLength={6}
                {...props}
            />
            <UiButton
                onClick={onClick}
                disabled={!!count}
                className="w-32"
            >
                {!!count ? count : "获取验证码"}
            </UiButton>
        </div>
    )
})
SelfPhoneCode.displayName = "SelfPhoneCode"
export const SelfPhoneCodeItem = () => {
    return (
        <UiFormItem
            name="code"
            label="验证码"
            typeMismatch="请输入6位验证码"
            valueMissing="验证码不得为空"
        >
            <SelfPhoneCode />
        </UiFormItem>
    )
}
export const PhoneCodeItem = ({ phone = "", equal = false }) => {
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
                equal={equal}
            />
        </UiFormItem>
    )
}
CodeItem.displayName = "CodeItem"
const PhoneCodeModal = forwardRef<
    HTMLDialogElement,
    DialogHTMLAttributes<HTMLDialogElement> & { loading?: boolean, equal?: boolean, onFinish: (data: { phone: string, code: string } & any) => void }
>(({ title, equal = false, onFinish, loading, ...props }, ref) => {
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
                    equal={equal}
                />
                <UiFormSubmit>
                    <div className="flex justify-end">
                        <UiButton loading={loading} submit>提交</UiButton>
                    </div>
                </UiFormSubmit>
            </UiForm>
        </UiModal>
    )
})
PhoneCodeModal.displayName = "PhoneCodeModal"
export default PhoneCodeModal