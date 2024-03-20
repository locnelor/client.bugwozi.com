"use client"

import UploadAvatarContext from "@/components/UploadAvatarContext"
import User from "@/interfaces/UserEntity"
import { routes } from "@/lib/route"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { join } from "path"


const HomeMenu = ({ user }: { user: User }) => {
    const pathname = usePathname();
    return (
        <div className="w-60">
            <div className="flex justify-center items-center">
                <UploadAvatarContext
                    user={user}
                />
            </div>
            <div
                className="text-center leading-9 line-clamp-1 truncate cursor-pointer"
            >
                {user.name}
            </div>
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