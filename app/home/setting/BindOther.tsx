"use client"
import UiButton from "@/components/ui/UiButton"
import { openInformationModal, openModal } from "@/components/ui/UiModal"
import UiTable from "@/components/ui/UiTable"
import { gqlError } from "@/lib/apollo-error"
import navigate from "@/lib/navigate"
import { gql, useMutation, useQuery } from "@apollo/client"
import { useCallback, useMemo } from "react"

export type BindInfo = {
    [k in string]: boolean
}
const BindInfoText = ({
    bind = false
}) => {
    if (bind) return "使用中"
    return "未绑定"
}
const BindButtonText = ({ bind = false }) => {
    if (!bind) return "添加绑定"
    return "解除绑定"
}
const GetSelfBindInfoQuery = gql`
    query getSelfBindInfo{
        getSelfBindInfo{
            giteeid
            qqOpenid
            wxOpenid
            githubid
        }
    }
`
const UnBindGiteeMutation = gql`
    mutation UnBindGitee{
        unbindGitee{
            message
        }
    }
`
const BindOther = () => {
    const { data, refetch } = useQuery<{
        getSelfBindInfo: { [k in string]: boolean }
    }>(GetSelfBindInfoQuery)
    const [unBindGitee] = useMutation(UnBindGiteeMutation, {
        onCompleted() {
            openInformationModal(() => ({ children: "解绑成功" }))
            refetch()
        },
        onError(error) {
            gqlError(error)
        },
    })
    const info = useMemo(() => data?.getSelfBindInfo || {}, [data]);

    const gitee = useCallback(() => {
        if (info["giteeid"]) {
            openModal(() => ({
                title: "确认要解除绑定吗？",
                onOk() {
                    unBindGitee()
                    return true;
                },
            }))
        } else {
            navigate("/auth/gitee")
        }
    }, [info["giteeid"]]);
    return (
        <div className="mt-5 mb-5" style={{ maxWidth: "700px" }}>
            <h1 className="mt-5 mb-5">使用以下任一方式都可以登录到您的 Bug窝子 帐号，避免由于某个帐号失效导致无法登录</h1>
            <table className="table tables-zebra">
                <thead>
                    <tr>
                        <th>绑定账号</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>微信</th>
                        <th><BindInfoText bind={info["wxOpenid"]} /></th>
                        <th><UiButton><BindButtonText bind={info["wxOpenid"]} /></UiButton></th>
                    </tr>
                    <tr>
                        <th>QQ</th>
                        <th><BindInfoText bind={info["qqOpenid"]} /></th>
                        <th><UiButton><BindButtonText bind={info["qqOpenid"]} /></UiButton></th>
                    </tr>
                    <tr>
                        <th>gitee</th>
                        <th><BindInfoText bind={info["giteeid"]} /></th>
                        <th><UiButton onClick={gitee}><BindButtonText bind={info["giteeid"]} /></UiButton></th>
                    </tr>
                    <tr>
                        <th>github</th>
                        <th><BindInfoText bind={info["githubid"]} /></th>
                        <th><UiButton><BindButtonText bind={info["githubid"]} /></UiButton></th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default BindOther