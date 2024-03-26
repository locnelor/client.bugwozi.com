"use client"
import { gql, useMutation } from "@apollo/client"
import { useCallback } from "react"
import { PageProps } from "@/interfaces/page"
import { setCookie } from "@/lib/cookie"
import { gqlError } from "@/lib/apollo-error"
import AuthBox from "../../AuthBox"
import UiDivider from "@/components/ui/UiDivider"


const BindWechatMutation = gql`
    mutation BindWechat($ticket:String!,$password:String!,$phone:String!){
        bindWechat(ticket:$ticket,password:$password,phone:$phone){
            token
        }
    }
`
const CreateWechatMutation = gql`
    mutation CreateWechat($ticket:String!){
        createWechat(ticket:$ticket){
            token
        }
    }
`
const AuthBindPage = ({
    searchParams: { ticket, back = "/home" }
}: PageProps<{ ticket: string, back?: string }>) => {
    const [bind, { loading }] = useMutation(BindWechatMutation, {
        onCompleted({ bindWechat: { token } }) {
            setCookie("token", token);
            window.location.href = back
        },
        onError(error) {
            gqlError(error)
        },
    })
    const [create] = useMutation(CreateWechatMutation, {
        onCompleted({ createWechat: { token } }) {
            setCookie("token", token);
            window.location.href = back
        },
        onError(error) {
            gqlError(error)
        }
    })
    const onSubmit = useCallback((variables: any) => {
        bind({
            variables: { ...variables, ticket }
        })
    }, [])
    const onClick = useCallback(() => create({ variables: { ticket } }), []);
    return (
        <div>
            <AuthBox
                onSubmit={onSubmit}
                loading={loading}
            />
            <UiDivider />
            <div>
                绑定已有账号，或 <span onClick={onClick} className="text-blue-700 cursor-pointer">创建新账号</span>
            </div>
        </div>
    )
}
export default AuthBindPage