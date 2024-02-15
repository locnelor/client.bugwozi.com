import UserEntity from "@/interfaces/UserEntity"
import Link from "next/link";

export type UserAvatarProps = {
    user?: UserEntity
}
const UserAvatar = ({
    user
}: UserAvatarProps) => {
    if (!user) return null;
    return (
        <div className="flex items-center gap-1">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <Link href={`/user/${user.hash_key}`}>
                        <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </Link>
                </div>
            </div>
            {user.name}
        </div>
    )
}
export default UserAvatar