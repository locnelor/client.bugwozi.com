import UserEntity from "@/interfaces/UserEntity"

export type UserAvatarProps = {
    user?: UserEntity
}
const UserAvatar = ({
    user
}: UserAvatarProps) => {
    if (!user) return null;
    return (
        <div className="rounded-full">
            <img src={`${process.env.NEXT_PUBLIC_API_URL}/media/user/${user.hash_key}/avatar`} alt="" />
        </div>
    )
}
export default UserAvatar