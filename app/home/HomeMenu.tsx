"use client"

import UploadAvatar from "@/components/UploadAvatar"
import User from "@/interfaces/User"
import { PowerEnum, getPowers, ClassesPower, PostsPower, CoursePower, DiscussPower } from "@/lib/route"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { join } from "path"

const has = (power: PowerEnum, callback: (p: number) => boolean) => {
    return (user: User) => callback(getPowers(power, user.role))
}
export const routes = [
    {
        name: "个人信息",
        path: "/"
    },
    {
        name: "账号设置",
        path: "/setting"
    },
    {
        name: "我的班级",
        role: has(ClassesPower, (e) => !!e),
        path: "/classes"
    },
    {
        name: "班级管理",
        role: has(ClassesPower, (e) => e >= 2),
        path: "/admin/classes"
    },
    {
        name: "文章管理",
        role: has(PostsPower, (e) => !!e),
        path: "/posts"
    },
    {
        name: "文章审批",
        role: has(PostsPower, (e) => e >= 2),
        path: "/admin/posts"
    },
    {
        name: "课程管理",
        role: has(CoursePower, e => !!e),
        path: "/course"
    },
    {
        name: "课程审批",
        role: has(CoursePower, e => e >= 2),
        path: "/admin/course"
    },
    {
        name: "我的话题",
        role: has(DiscussPower, e => e >= 2),
        path: "/discuss"
    },
    {
        name: "话题管理",
        role: has(DiscussPower, e => e >= 3),
        path: "/admin/discuss"
    }
]
const HomeMenu = ({ user }: { user: User }) => {
    const pathname = usePathname();
    return (
        <div className="w-60">
            <div className="flex justify-center items-center">
                <UploadAvatar
                    onUpload={function (base64: string): boolean | Promise<boolean> {
                        console.log(base64)
                        return true;
                    }}
                >
                    <div className="avatar">
                        <div className="w-24 rounded-full">
                            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                </UploadAvatar>
            </div>
            <div className="text-center leading-9 line-clamp-1 truncate">你待我如初见，我诺千里寻铭心</div>
            <ul className="menu bg-base-200 w-56 rounded-box">
                {routes.filter(({ role }) => {
                    if (!role) return true;
                    return role(user)
                }).map(({ name, path }, key) => (
                    <li key={key}>
                        <Link className={join(pathname, ".") === join("/home", path, ".") ? "active" : ""} href={`/home${path}`}>
                            {name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default HomeMenu