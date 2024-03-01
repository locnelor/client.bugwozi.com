"use client"
import UiButton from "@/components/ui/UiButton"
import UiInput from "@/components/ui/UiInput"



const AccountPassword = () => {

    return (
        <div className="mt-5 mb-5">
            <div className="font-bold">登录密码</div>
            <div className="flex max-w-96 gap-5">
                <UiInput value="123456" type="password" disabled />
                <UiButton>
                    修改密码
                </UiButton>
            </div>
        </div>
    )
}
export default AccountPassword