import BaseEntity from "./BaseEntity";

export default interface UserEntity extends BaseEntity {
    role: number
    name: string
    account: string
    hash_key: string
}

export const  UserFields = `
    id
    createAt
    updateAt
    name
    role
    hash_key
    profile{
        id
    }
`