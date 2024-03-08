"use client"
import UiButton from "@/components/ui/UiButton"
import UiTable from "@/components/ui/UiTable"
import { useMemo } from "react"

export type BindInfo = {
    [k in string]: boolean
}
export type BindOtherProps = {
    info: BindInfo
}
const BindInfoText = ({
    bind = false
}) => {
    if (bind) return "使用中"
    return "未绑定"
}
const BindButtonText = ({ bind = false }) => {
    if (bind) return "添加绑定"
    return "解除绑定"
}
const BindOther = ({
    info
}: BindOtherProps) => {
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
                        <th><UiButton>添加绑定</UiButton></th>
                    </tr>
                    <tr>
                        <th>QQ</th>
                        <th><BindInfoText bind={info["qqOpenid"]} /></th>
                        <th><UiButton>添加绑定</UiButton></th>
                    </tr>
                    <tr>
                        <th>gitee</th>
                        <th><BindInfoText bind={info["giteeid"]} /></th>
                        <th><UiButton>添加绑定</UiButton></th>
                    </tr>
                    <tr>
                        <th>github</th>
                        <th><BindInfoText bind={info["githubid"]} /></th>
                        <th><UiButton>添加绑定</UiButton></th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default BindOther