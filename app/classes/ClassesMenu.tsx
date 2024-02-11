"use client"

import User from "@/interfaces/UserEntity"
import CreateClasses from "./CreateClasses"
import gql from "graphql-tag"
import { ClassesPower, getPowers } from "@/lib/route"
import { useQuery } from "@apollo/client"
import navigate from "@/lib/navigate"
import Link from "next/link"

const GetMyClassesQuery = gql`
    query{
        getMyClasses{
            id
            name
            hash_key
        }
    }
`

const ClassesMenu = ({ user }: { user: User }) => {
    const power = getPowers(ClassesPower, user.role);
    const {
        data,
        loading,
        error,
        refetch
    } = useQuery(GetMyClassesQuery);
    if (!!error) navigate("/500")
    if (!!loading) return (
        <div className="w-56 gap-2 flex flex-col">
            <div className="skeleton h-8 w-full"></div>
            <div className="skeleton h-8 w-full"></div>
            <div className="skeleton h-8 w-full"></div>
            <div className="skeleton h-8 w-full"></div>
            <div className="skeleton h-8 w-full"></div>
        </div>
    )
    return (
        <ul className="menu bg-base-200 w-56 rounded">
            {power >= 1 && (
                <CreateClasses
                    refetch={refetch}
                />
            )}
            <li><a>消息中心</a></li>
            {data.getMyClasses.map(({ id, name, hash_key }: any) => (
                <li key={id}>
                    <Link href={`/classes/${hash_key}`}>
                        {name}
                    </Link>
                </li>
            ))}
        </ul>
    )
}
export default ClassesMenu