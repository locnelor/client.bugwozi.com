
import UiDivider from "@/components/ui/UiDivider"
import { Metadata } from "next"
import BindPhone from "./BindPhone"
import AccountPassword from "./AccountPassword"
import { getQuery } from "@/lib/client"
import { gql } from "@apollo/client"
import { ResultEntity } from "@/interfaces/ResultEntity"
import BindOther from "./BindOther"
export const metadata: Metadata = {
    title: "账号设置"
}

const getSelfPhoneQuery = gql`
    query GetSelfPhone{
        getSelfPhone{
            message
        }
    }
`
const SettingPage = async () => {
    const { data } = await getQuery<{ getSelfPhone: ResultEntity }>(getSelfPhoneQuery)

    return (
        <div>
            <h1 className="text-2xl">账号设置</h1>
            <UiDivider />
            <h1 className="text-xl">登录账号</h1>
            <BindPhone phone={data?.getSelfPhone.message} />
            <AccountPassword />
            <h1 className="text-xl">第三方绑定</h1>
            <BindOther info={{}} />
        </div>
    )
}
export default SettingPage