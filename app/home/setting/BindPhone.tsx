"use client"
import PhoneCodeModal from "@/components/PhoneCodeModal"
import UiButton from "@/components/ui/UiButton"
import UiInput from "@/components/ui/UiInput"
import { useModalEvent } from "@/components/ui/UiModal"
import { gqlError } from "@/lib/apollo-error"
import { gql, useMutation } from "@apollo/client"
import { useCallback } from "react"

const SetAccountPhoneMutation = gql`
    mutation setAccountPhone($phone:String!,$code:String!){
        setAccountPhone(phone:$phone,code:$code){
            message
        }
    }
`
const BindPhone = ({ phone = "" }) => {
    const [ref, openModal, cancel] = useModalEvent()
    const [setPhone, { loading }] = useMutation(SetAccountPhoneMutation, {
        onError(error) {
            gqlError(error)
        },
        onCompleted() {
            cancel()
            window.location.reload()
        }
    })
    const onFinish = useCallback(({ phone, code }: any) => {
        setPhone({ variables: { phone, code } })
    }, [])
    return (
        <div className="mt-5 mb-5">
            <div className="font-bold">登录手机</div>
            <div className="flex max-w-96 gap-5">
                <UiInput disabled value={phone} />
                <UiButton onClick={openModal}>
                    更换号码
                </UiButton>
                <PhoneCodeModal
                    ref={ref}
                    title="绑定手机号"
                    onFinish={onFinish}
                    loading={loading}
                    equal
                />
            </div>
        </div>
    )
}
export default BindPhone