"client"

import { useColumns, useDataSource } from "@/hooks/useTable"
import useTreeMenu from "@/hooks/useTreeMenu"
import { sys_menu, sys_user } from "@prisma/client"
import { Divider, Table } from "antd"


const ClientPage = ({
    users,
    menuList
}: {
    users: sys_user[],
    menuList: sys_menu[]
}) => {
    const dataSource = useDataSource(users);
    const columns = useColumns([{
        title: "用户名",
        dataIndex: "account"
    }])
    const tree = useTreeMenu(menuList)
    const treeColumns = useColumns([{
        dataIndex: "name",
        title: "权限名"
    }, {
        dataIndex: "path",
        title: "路径"
    }])
    return (
        <div>
            <Divider>权限树</Divider>
            <Table
                dataSource={tree}
                columns={treeColumns}
            />
            <Divider>用户表数据</Divider>
            <Table
                columns={columns}
                dataSource={dataSource}
            />
        </div>
    )
}
export default ClientPage