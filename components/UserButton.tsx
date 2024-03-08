"use client"
import User from "@/interfaces/UserEntity"
import { setCookie } from "@/lib/cookie"
import Link from "next/link"
import { useCallback } from "react"
import UserAvatar from "./UserAvatar"
export type UserButtonProps = {
    user?: User
}
const UserButton = ({ user }: UserButtonProps) => {
    const onLogout = useCallback(() => {
        setCookie("token", "")
        window.location.href = "/auth"
    }, [])
    if (!user) {
        return (
            <div className="dropdown dropdown-end">
                <Link href="/auth">
                    <div tabIndex={0} role="button" className="btn btn-ghost placeholder btn-circle avatar">
                        <div className="w-10 bg-neutral text-neutral-content rounded-full">
                            <span>登录</span>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <UserAvatar
                    user={user}
                />
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li>
                    <Link href="/home" className="justify-between">
                        个人中心
                    </Link>
                </li>
                <li><Link href="/home/setting">设置</Link></li>
                <li>
                    <a onClick={onLogout}>
                        退出登录
                    </a>
                </li>
            </ul>
        </div>
    )
}
export default UserButton