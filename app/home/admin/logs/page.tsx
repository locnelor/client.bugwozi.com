"use client"

import UserNameAvatar from "@/components/UserNameAvatar"
import UiDivider from "@/components/ui/UiDivider"
import { UserFields } from "@/interfaces/UserEntity"
import { gql, useQuery } from "@apollo/client"
import moment from "moment"
import { useCallback, useEffect, useMemo, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"

const GetLogsQuery = gql`
    query GetLogs($time:String,$take:Int){
        getLogs(time:$time,take:$take){
            id      
            createAt 
            updateAt 
            user{
                ${UserFields}
            }     
            userId   
            type     
            name     
            ip       
            status   
            message  
            time     
        }
    }
`
const HomeAdminLogsPage = () => {
    const { data, refetch } = useQuery<{ getLogs: any[] }>(GetLogsQuery)
    const [logs, setLogs] = useState<any[]>([]);
    const [variables, setVariables] = useState({});
    useEffect(() => {
        if (!!data && !!data.getLogs) setLogs([...logs, ...data.getLogs]);
    }, [data])
    const hasMore = useMemo(() => !!data && !!data.getLogs.length, [data]);
    const next = useCallback(() => {
        const time = hasMore ? data?.getLogs[data.getLogs.length - 1].createAt : undefined
        refetch({ ...variables, time })
    }, [variables, hasMore, data])
    return (
        <div>
            <h1>日志列表</h1>
            <UiDivider />
            <InfiniteScroll
                next={next}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p className="text-center">
                        <b>到底了！</b>
                    </p>
                }
                dataLength={logs.length}
            >
                {logs.map((item, key) => (
                    <div
                        key={key}
                        className="mt-2 mb-2 flex items-center border"
                    >
                        <div className="w-24">
                            {moment(item.createAt).format("YYYY-MM-DD")}
                        </div>
                        <div className="w-36">
                            {item.user ? (
                                <UserNameAvatar
                                    user={item.user}
                                />
                            ) : "游客"}
                        </div>
                        <div className="w-28">
                            {item.type}
                        </div>
                        <div className="w-56">
                            {item.name}
                        </div>
                        <div className="w-36">
                            {item.ip}
                        </div>
                        <div className="w-10">
                            {item.status}
                        </div>
                        <div className="w-10">
                            {item.time}
                        </div>
                        <div>
                            {item.message}
                        </div>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    )
}
export default HomeAdminLogsPage