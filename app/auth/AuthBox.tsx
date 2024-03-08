import UiButton from "@/components/ui/UiButton"
import UiForm, { UiFormItem, UiFormSubmit } from "@/components/ui/UiForm"
import UiInput from "@/components/ui/UiInput"

const AuthBox = ({
    onSubmit = (data: any) => { },
    loading = false
}) => {
    return (
        <UiForm
            onSubmit={onSubmit}
        >
            <UiFormItem
                label="手机号"
                valueMissing="请输入手机号"
                name="phone"
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
        </UiForm>
    )
}
export default AuthBox