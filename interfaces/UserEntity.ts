import BaseEntity from "./BaseEntity";

export default interface UserEntity extends BaseEntity {
    role: number
    name: string
    account: string
}