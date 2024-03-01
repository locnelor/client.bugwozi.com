import { DialogHTMLAttributes, forwardRef, useCallback, useEffect, useState } from "react"
import UiModal, { UiModalTitle } from "./ui/UiModal"
import UiForm, { UiFormItem, UiFormSubmit } from "./ui/UiForm"
import UiInput from "./ui/UiInput"
import UiButton from "./ui/UiButton"
import { gql, useMutation, useQuery } from "@apollo/client"
import { gqlError } from "@/lib/apollo-error"
import GetCode from "@/queries/GetCode.gql"

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
const CodeItem = forwardRef<
    HTMLInputElement,
    CodeItemProps
>(({ phone, required }, ref) => {
    const [count, setCount] = useState(0);
    const { data, refetch } = useQuery(GetCode)
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
    const onClick = useCallback(() => {
        setCount(60);
        getPhoneCode({ variables: { phone } })
    }, [phone])
    return (
        <div className="flex gap-5">
            <UiInput
                ref={ref}
                required={required}
            />
            <div
                onClick={() => refetch()}
                className="cursor-pointer"
                dangerouslySetInnerHTML={{ __html: data?.getCode }}
            >
            </div>
            <UiButton
                onClick={onClick}
                disabled={(!!count && phone.length === 11)}
                className="w-32"
            >
                {!!count ? count : "获取验证码"}
            </UiButton>
        </div>
    )
})
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
                <UiFormItem
                    name="phone"
                    label="手机号"
                    valueMissing="手机号不得为空"
                    typeMismatch="请输入11位手机号"
                >
                    <UiInput
                        value={phone}
                        onChange={({ target: { value } }) => setPhone(value)}
                        required
                        maxLength={11}
                        minLength={11}
                    />
                </UiFormItem>
                <UiFormItem
                    name="phone"
                    label="验证码"
                >
                    <CodeItem
                        phone={phone}
                        required
                    />
                </UiFormItem>
                <UiFormSubmit>
                    <div className="flex justify-end">
                        <UiButton submit>提交</UiButton>
                    </div>
                </UiFormSubmit>
            </UiForm>
        </UiModal>
    )
})
export default PhoneCodeModal