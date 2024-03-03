import { UiOption } from "@/components/reactDraftEditor/components/ui/UiSelect"
import UiButton from "@/components/ui/UiButton"
import UiDivider from "@/components/ui/UiDivider"
import UiForm, { UiFormItem, UiFormSubmit } from "@/components/ui/UiForm"
import UiInput from "@/components/ui/UiInput"
import UiSelect from "@/components/ui/UiSelect"
import UiTextarea from "@/components/ui/UiTextarea"
import useClientViewer from "@/hooks/useClientViewer"
import UserEntity from "@/interfaces/UserEntity"
import { gqlError, gqlSuccess } from "@/lib/apollo-error"
import { gql, useApolloClient, useMutation } from "@apollo/client"
import { useCallback } from "react"


const UpdSelfInformationMutation = gql`
    mutation UpdSelfInformation($name:String!,$gender:Int!,$information:String){
        updSelfInformation(name:$name,gender:$gender,information:$information){
            message
        }
    }
`
export type HomeInformationContextProps = {
    user: UserEntity
}
const HomeInformationContext = ({ user }: HomeInformationContextProps) => {
    const client = useApolloClient()
    const [updSelfInformation] = useMutation(UpdSelfInformationMutation, {
        onError(error) {
            gqlError(error)
        },
        onCompleted() {
            gqlSuccess()
            client.resetStore()
        },
    })
    const onSubmit = useCallback((variables: any) => {
        variables.gender = parseInt(variables.gender)
        updSelfInformation({ variables })
    }, [])
    return (
        <div>
            <h1 className="text-2xl">个人信息</h1>
            <UiDivider />
            <div className="max-w-96">
                <UiForm
                    onSubmit={onSubmit}
                >
                    <UiFormItem
                        name="name"
                        label="用户名"
                        valueMissing="用户名不得为空"
                    >
                        <UiInput required defaultValue={user?.name} />
                    </UiFormItem>
                    <UiFormItem
                        name="gender"
                        label="性别"
                    >
                        <UiSelect defaultValue={user?.gender}>
                            <UiOption
                                value={0}
                            >
                                保密
                            </UiOption>
                            <UiOption
                                value={1}
                            >
                                男
                            </UiOption>
                            <UiOption
                                value={2}
                            >
                                女
                            </UiOption>
                        </UiSelect>
                    </UiFormItem>
                    <UiFormItem
                        name="information"
                        label="个性签名"
                    >
                        <UiTextarea defaultValue={user?.information} />
                    </UiFormItem>
                    <UiFormSubmit>
                        <UiButton submit>
                            保存
                        </UiButton>
                    </UiFormSubmit>
                </UiForm>
            </div>
        </div>
    )
}
export default HomeInformationContext