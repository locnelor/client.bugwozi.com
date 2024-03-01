"use client"
import PhoneCodeModal from "@/components/PhoneCodeModal"
import UiButton from "@/components/ui/UiButton"
import UiInput from "@/components/ui/UiInput"
import { useModalEvent } from "@/components/ui/UiModal"
import { useCallback } from "react"


const BindPhone = ({ phone }: { phone?: string }) => {
    const [ref, openModal] = useModalEvent()
    const onFinish = useCallback(({ phone, code }: any) => {
        console.log(phone, code)
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
                />
            </div>
        </div>
    )
}
export default BindPhone