"use client"

import useClientViewer from "@/hooks/useClientViewer"
import { setCookie } from "@/lib/cookie";
import { Avatar, Button, Flex, Popover } from "antd";
import Link from "next/link";
import { useCallback } from "react";


const UserButton = () => {
    const { user } = useClientViewer();
    const onLogout = useCallback(() => {
        setCookie("token", "");
        window.location.href = "/auth"
    }, []);
    if (!!user) {
        return (
            <Popover
                content={(
                    <div>
                        <Button
                            onClick={onLogout}
                            type="link"
                        >
                            退出登录
                        </Button>
                    </div>
                )}
            >
                <Link href="/home">
                    <Flex align="center" gap={2}>
                        <Avatar>
                            {user.name}
                        </Avatar>
                        <div>
                            {user.name}
                        </div>
                    </Flex>
                </Link>
            </Popover>
        )
    }
    return (
        <Link href="/auth">
            <Button type="dashed">
                注册 或 登录
            </Button>
        </Link>
    )
}
export default UserButton