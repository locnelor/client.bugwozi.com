"use client"

import UploadAvatar from "@/components/UploadAvatar"
import UserAvatar from "@/components/UserAvatar"
import { openInformationModal } from "@/components/ui/UiModal"
import User from "@/interfaces/UserEntity"
import { PowerEnum, getPowers, PostsPower, CoursePower } from "@/lib/route"
import { gql, useMutation } from "@apollo/client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { join } from "path"
import { useCallback } from "react"

const hasRule = (power: PowerEnum, callback: (p: number) => boolean) => {
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
        name: "我的文章",
        role: hasRule(PostsPower, (e) => !!e),
        path: "/posts"
    },
    {
        name: "文章管理",
        role: hasRule(PostsPower, (e) => e === 3),
        path: "/admin/posts"
    },
    {
        name: "课程管理",
        role: hasRule(CoursePower, e => !!e),
        path: "/admin/course"
    },
]
const UploadAvatarMutation = gql`
    mutation UploadAvatar($avatar:String!){
        uploadAvatar(avatar:$avatar){
            message
        }
    }
`
const HomeMenu = ({ user }: { user: User }) => {
    const pathname = usePathname();
    const [upload] = useMutation(UploadAvatarMutation, {
        onError(error) {
            openInformationModal(() => ({ title: "修改失败", children: error.message }))
        },
        onCompleted(data) {
            const message = data.uploadAvatar.message
            openInformationModal(() => ({ title: message }));
            if (message === "success") {
                window.location.reload()
            }
        },
    })
    const onUpload = useCallback((avatar: string) => {
        return upload({ variables: { avatar } }).then(() => true).catch(() => false)
    }, [])
    return (
        <div className="w-60">
            <div className="flex justify-center items-center">
                <UploadAvatar
                    onUpload={onUpload}
                >
                    <div className="avatar">
                        <div className="w-24 rounded-full">
                            <UserAvatar
                                user={user}
                            />
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