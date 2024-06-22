"use client"
import AuthBox from "./AuthBox";
import { gql, useMutation } from "@apollo/client";
import { gqlError } from "@/lib/apollo-error";
import { setCookie } from "@/lib/cookie";
import { useCallback } from "react";
import Image from "next/image";
import { Button, Divider, Flex } from "antd";

const AuthMutation = gql`
    mutation Auth($account:String!,$password:String!){
        auth(
            account:$account,
            password:$password
        ){
            token
        }
    }
`
const Auth = ({ searchParams: { back = "/" } }) => {
    const [auth, { loading }] = useMutation(AuthMutation, {
        onCompleted({ auth: { token } }) {
            setCookie("token", token);
            window.location.href = back
        },
        onError(error) {
            gqlError(error)
        },
    })
    const onSubmit = useCallback((variables: any) => {
        auth({
            variables
        })
    }, []);
    return (
        <div>
            <AuthBox
                loading={loading}
                onSubmit={onSubmit}
            />
            <Divider>其他登录方式</Divider>
            <div className="flex gap-3 justify-center mt-5">
                <div className="cursor-pointer">
                    <a
                        href={`/auth/gitee`}
                    >
                        <Button block>
                            <Flex>
                                <Image width={20} height={20} src="/Logo_gitee_light.svg" alt="gitee" />
                                gitee快速登录
                            </Flex>
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    )
}
export default Auth