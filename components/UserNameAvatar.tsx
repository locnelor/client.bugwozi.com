import UserEntity from "@/interfaces/UserEntity";
import Link from "next/link";
import UserAvatar from "./UserAvatar";

export type UserNameAvatarProps = {
    user?: UserEntity
}
const UserNameAvatar = ({
    user
}: UserNameAvatarProps) => {
    if (!user) return null;
    return (
        <div className="flex items-center gap-1">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <Link href={`/user/${user.hash_key}`}>
                    <UserAvatar
                        user={user}
                    />
                </Link>
            </div>
            {user.name}
        </div>
    )
}
export default UserNameAvatar