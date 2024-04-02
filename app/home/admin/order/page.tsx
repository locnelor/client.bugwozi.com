"use client"

import UserNameAvatar from "@/components/UserNameAvatar"
import UiDivider from "@/components/ui/UiDivider"
import { UserFields } from "@/interfaces/UserEntity"
import { gql, useQuery } from "@apollo/client"
import InfiniteScroll from "react-infinite-scroll-component"
import { useCallback, useEffect, useMemo, useState } from "react"
import { OrderEntity } from "@/interfaces/OrderEntity"
import moment from "moment"


const QueryOrderListQuery = gql`
    query QueryOrderList($id:Int){
        queryOrderList(id:$id){
            user{
                ${UserFields}
            }
            transaction_id
            comment
            total
        }
    }
`
const HomeAdminOrderPage = () => {
    const { data, refetch } = useQuery(QueryOrderListQuery)
    const [orders, setOrders] = useState<OrderEntity[]>([]);
    const hasMore = useMemo(() => !!data && !!data.queryOrderList.length, [data]);
    const next = useCallback(() => {
        const id = hasMore ? data?.queryOrderList[data.queryOrderList.length - 1].id : undefined
        refetch({ id })
    }, [hasMore])
    useEffect(() => {
        if (!!data && !!data.queryOrderList) setOrders([...orders, ...data.queryOrderList]);
    }, [data])
    return (
        <div>
            <h1 className="text-2xl">订单管理</h1>
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
                    <InfiniteScroll
                        next={next}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p className="text-center">
                                <b>到底了！</b>
                            </p>
                        }
                        dataLength={orders.length}
                    >
                        {orders.map(({ transaction_id, comment, total, createAt, user }, key) => (
                            <tr
                                key={key}
                            >
                                <td>
                                    <UserNameAvatar user={user} />
                                </td>
                                <td>
                                    {transaction_id}
                                </td>
                                <td>
                                    {moment(createAt).format("YYYY-MM-DD HH:mm:ss")}
                                </td>
                                <td>
                                    {total / 100} ¥
                                </td>
                                <td>
                                    {comment}
                                </td>
                            </tr>
                        ))}
                    </InfiniteScroll>
                </tbody>
            </table>
        </div>
    )
}
export default HomeAdminOrderPage