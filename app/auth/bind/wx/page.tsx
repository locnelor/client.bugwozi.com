"use client"
import { gql, useMutation } from "@apollo/client"
import { useCallback } from "react"
import { PageProps } from "@/interfaces/page"
import { setCookie } from "@/lib/cookie"
import { gqlError } from "@/lib/apollo-error"
import AuthBox from "../../AuthBox"


const BindGiteeMutation = gql`
    mutation BindGitee($token:String!,$password:String!,$phone:String!){
        bindGitee(token:$token,password:$password,phone:$phone){
            token
        }
    }
`
const CreateGiteeMutation = gql`
    mutation CreateGitee($token:String!){
        createGitee(token:$token){
            token
        }
    }
`
const AuthBindPage = ({
    searchParams: { token, back = "/home" }
}: PageProps<{ token: string, back?: string }>) => {
    const [bind, { loading }] = useMutation(BindGiteeMutation, {
        onCompleted({ bindGitee: { token } }) {
            setCookie("token", token);
            window.location.href = back
        },
        onError(error) {
            gqlError(error)
        },
    })
    const [create] = useMutation(CreateGiteeMutation, {
        onCompleted({ createGitee: { token } }) {
            setCookie("token", token);
            window.location.href = back
        },
        onError(error) {
            gqlError(error)
        }
    })
    const onSubmit = useCallback((variables: any) => {
        bind({
            variables: { ...variables, token }
        })
    }, [])
    const onClick = useCallback(() => create({ variables: { token } }), []);
    return (
        <div>
            <AuthBox
                onSubmit={onSubmit}
                loading={loading}
            />
            <div>
                绑定已有账号，或 <span onClick={onClick} className="text-blue-700 cursor-pointer">创建新账号</span>
            </div>
        </div>
    )
}
export default AuthBindPage