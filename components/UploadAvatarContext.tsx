import classNames from "classnames"
import UploadAvatar from "./UploadAvatar"
import UserAvatar from "./UserAvatar"
import UserEntity from "@/interfaces/UserEntity"
import { gql, useMutation } from "@apollo/client"
import { useCallback } from "react"
import { openInformationModal } from "./ui/UiModal"

const UploadAvatarMutation = gql`
    mutation UploadAvatar($avatar:String!){
        uploadAvatar(avatar:$avatar){
            message
        }
    }
`
const UploadAvatarContext = ({
    className = "w-24",
    user
}: {
    className?: string,
    user?: UserEntity
}) => {
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
        <UploadAvatar
            onUpload={onUpload}
        >
            <div className="avatar">
                <div className={classNames(
                    "rounded-full",
                    className
                )}>
                    <UserAvatar
                        user={user}
                    />
                </div>
            </div>
        </UploadAvatar>
    )
}
export default UploadAvatarContext