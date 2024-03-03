"use client"
import UserNameAvatar from "@/components/UserNameAvatar"
import UiButton from "@/components/ui/UiButton"
import UiDivider from "@/components/ui/UiDivider"
import UiForm, { UiFormItem, UiFormSubmit } from "@/components/ui/UiForm"
import UiInput from "@/components/ui/UiInput"
import UserEntity, { UserFields } from "@/interfaces/UserEntity"
import { gql, useQuery } from "@apollo/client"
import { useCallback, useEffect, useMemo, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"


const GetUserQuery = gql`
    query GetUsers($take:Int,$id:Int,$phone:String,$name:String){
        getUsers(take:$take,id:$id,phone:$phone,name:$name){
            ${UserFields}
        }
    }
`
const HomeAdminAccountPage = () => {
    const { data, refetch } = useQuery<{
        getUsers: UserEntity[]
    }>(GetUserQuery)
    const [variables, setVariables] = useState({});
    const [users, setUsers] = useState<UserEntity[]>([]);
    useEffect(() => {
        if (!!data && !!data.getUsers) setUsers([...users, ...data.getUsers]);
    }, [data])
    const hasMore = useMemo(() => !!data && !!data.getUsers.length, [data]);
    const next = useCallback(() => {
        const id = hasMore ? data?.getUsers[data.getUsers.length - 1].id : undefined
        refetch({ ...variables, id })
    }, [variables, hasMore])
    const onSubmit = useCallback((variables: any) => {
        setVariables({ ...variables })
        setUsers([]);
        refetch({ id: 0, ...variables })
    }, [])
    return (
        <div>
            <h1 className="text-2xl">账号管理</h1>
            <UiDivider />
            <div className="max-w-96">
                <UiForm
                    onSubmit={onSubmit}
                >
                    <UiFormItem
                        name="name"
                        label="姓名"
                    >
                        <UiInput />
                    </UiFormItem>
                    <UiFormItem
                        name="phone"
                        label="手机号"
                    >
                        <UiInput />
                    </UiFormItem>
                    <UiFormSubmit>
                        <UiButton submit>搜索</UiButton>
                    </UiFormSubmit>
                </UiForm>
            </div>
            <div className="max-w-96 mt-5">
                <InfiniteScroll
                    next={next}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p className="text-center">
                            <b>到底了！</b>
                        </p>
                    }
                    dataLength={users.length}
                >
                    {users.map((item, key) => (
                        <div className="flex gap-3 border-b p-2 rounded items-center" key={key}>
                            <div>
                                {item.id}
                            </div>
                            <div className="w-64">
                                <UserNameAvatar
                                    user={item}
                                />
                            </div>
                            <div>
                                <UiButton>
                                    查看
                                </UiButton>
                            </div>
                        </div>
                    ))}
                </InfiniteScroll>

            </div>
        </div>
    )
}

export default HomeAdminAccountPage