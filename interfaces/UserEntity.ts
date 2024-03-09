import BaseEntity from "./BaseEntity";

export default interface UserEntity extends BaseEntity {
    role: number
    name: string
    account: string
    hash_key: string
    gender: number
    information: string
}

export const UserFields = `
    id
    createAt
    updateAt
    name
    gender
    role
    information
    hash_key
    profileId
`