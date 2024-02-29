"use client"

import UploadAvatar from "@/components/UploadAvatar"
import UserAvatar from "@/components/UserAvatar"
import UiButton from "@/components/ui/UiButton"
import UiInput from "@/components/ui/UiInput"
import UiModal, { UiModalTitle, openInformationModal, useModalEvent } from "@/components/ui/UiModal"
import User from "@/interfaces/UserEntity"
import { routes } from "@/lib/route"
import { gql, useApolloClient, useMutation } from "@apollo/client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { join } from "path"
import { useCallback, useState } from "react"


const UploadAvatarMutation = gql`
    mutation UploadAvatar($avatar:String!){
        uploadAvatar(avatar:$avatar){
            message
        }
    }
`
const UpdSelfNameMutation = gql`
    mutation UpdSelfName($name:String!){
        updSelfName(name:$name){
            message
        }
    }
`
const HomeMenu = ({ user }: { user: User }) => {
    const pathname = usePathname();
    const client = useApolloClient();
    const [updSelfname, { loading }] = useMutation(UpdSelfNameMutation, {
        onError(error) {
            openInformationModal(() => ({ title: "发生了一些错误", children: error.message }))
        },
        onCompleted() {
            openInformationModal(() => ({ title: "修改成功" }))
            cancel()
            client.resetStore()
        }
    })
    const [modalRef, open, cancel] = useModalEvent();
    const [name, setName] = useState(user.name);
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
    const onUpdName = useCallback(() => {
        if (user.name === name) {
            cancel();
            return;
        }
        updSelfname({ variables: { name } })
    }, [user, name])
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
            <div
                className="text-center leading-9 line-clamp-1 truncate cursor-pointer"
                onClick={open}
            >
                你待我如初见，我诺千里寻铭心
            </div>
            <UiModal
                ref={modalRef}
                onCancel={cancel}
            >
                <UiModalTitle>修改用户名</UiModalTitle>
                <UiInput
                    value={name}
                    onChange={({ target: { value } }) => setName(value)}
                />
                <div className="flex justify-end gap-2">
                    <UiButton onClick={cancel}>
                        取消
                    </UiButton>
                    <UiButton
                        loading={loading}
                        onClick={onUpdName}
                    >
                        确认
                    </UiButton>
                </div>
            </UiModal>
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