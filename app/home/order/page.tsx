import UiDivider from "@/components/ui/UiDivider"
import { OrderEntity } from "@/interfaces/OrderEntity"
import { getQuery } from "@/lib/client"
import { gql } from "@apollo/client"
import moment from "moment"
import { Metadata } from "next"
import { notFound } from "next/navigation"


const GetSelfOrderQuery = gql`
    query GetSelfOrder{
        getSelfOrder{
            id
            transaction_id
            createAt
            comment
            total
        }
    }
`
export const metadata: Metadata = {
    title: "我的订单"
}
const HomeOrderPage = async () => {
    const { data, error } = await getQuery<{
        getSelfOrder: OrderEntity[]
    }>(GetSelfOrderQuery)
    if (!!error) notFound()
    return (
        <div>
            <h1 className="text-2xl">账号设置</h1>
            <UiDivider />
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>订单编号</th>
                        <td>支付日期</td>
                        <td>总金额</td>
                        <td>备注</td>
                    </tr>
                </thead>
                <tbody>
                    {data?.getSelfOrder.map(({ createAt, comment, total, transaction_id }) => (
                        <tr
                            key={transaction_id}
                        >
                            <td>
                                {transaction_id}
                            </td>
                            <td>
                                {moment(createAt).format("YYYY-MM-DD hh:mm:ss")}
                            </td>
                            <td>
                                {total / 100} ¥
                            </td>
                            <td>
                                {comment}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default HomeOrderPage