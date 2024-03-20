"use client"
import useClientViewer from "@/hooks/useClientViewer"
import HomeInformationPage from "./information/page"
import UploadAvatarContext from "@/components/UploadAvatarContext";
import Link from "next/link";
import { Config, HomeTwo, Logout, Order } from "@icon-park/react";
import useLogout from "@/hooks/useLogout";

const UserHomePage = () => {
    const { data } = useClientViewer();
    const user = data?.viewer
    const onLogout = useLogout()
    return (
        <div className="block sm:hidden">
            <div className="flex items-center gap-5 p-5">
                <UploadAvatarContext
                    user={user}
                    className="w-20"
                />
                <div className="text-xl">
                    {user?.name}
                </div>
            </div>
            <ul className="menu rounded-box">
                <li>
                    <Link href="/home/information">
                        <HomeTwo />
                        个人信息
                    </Link>
                </li>
                <li>
                    <Link href="/home/setting">
                        <Config />
                        账号管理
                    </Link>
                </li>
                <li>
                    <Link href="/home/order">
                        <Order />
                        我的订单
                    </Link>
                </li>
                <li onClick={onLogout}>
                    <a>
                        <Logout />
                        退出登录
                    </a>
                </li>
            </ul>
        </div>
    )
}
const HomePage = () => {
    return (
        <div>
            <div className="hidden sm:block">
                <HomeInformationPage />
            </div>
            <UserHomePage />
        </div>
    )
}
export default HomePage