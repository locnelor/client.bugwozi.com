"use client"

import UiDivider from "@/components/ui/UiDivider"
import { gqlError } from "@/lib/apollo-error"
import { gql, useMutation, useQuery } from "@apollo/client"
import { useCallback, useState } from "react"


const GetAppsQuery = gql`
    query GetApps{
        getApps{
            name
            description
            status
        }
    }
`
const StartAppMutation = gql`
    mutation StartApp($name:String!){
        startApp(name:$name){
            message
        }
    }
`
const StopAppMutation = gql`
    mutation StopApp($name:String!){
        stopApp(name:$name){
            message
        }
    }
`
const HomeAdminSystemPage = () => {
    const [loading, setLoading] = useState(false);
    const { data, refetch } = useQuery<{
        getApps: {
            name: string,
            description: string,
            status: boolean
        }[]
    }>(GetAppsQuery)
    const [startApp] = useMutation(StartAppMutation)
    const [stopApp] = useMutation(StopAppMutation)


    const onChange = useCallback((name: string, status: boolean) => {
        setLoading(true)
        const app = status ? stopApp : startApp;
        app({ variables: { name } })
            .catch((e) => gqlError(e))
            .finally(() => refetch())
            .finally(() => setLoading(false))
    }, [])
    return (
        <div>
            <h1 className="text-2xl">系统服务管理</h1>
            <UiDivider />
            <table className="table tables-zebra max-w-96">
                <thead>
                    <tr>
                        <th>字段</th>
                        <th>简介</th>
                        <th>状态</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.getApps.map((
                        { name, description, status },
                        key
                    ) => (
                        <tr
                            key={key}
                        >
                            <td>{name}</td>
                            <td>{description}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    className="toggle toggle-success"
                                    checked={status}
                                    onChange={onChange.bind(null, name, status)}
                                    disabled={loading}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default HomeAdminSystemPage