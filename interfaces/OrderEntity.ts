import BaseEntity from "./BaseEntity";
import UserEntity from "./UserEntity";



export interface OrderEntity extends BaseEntity {
    comment?: string
    total: number
    transaction_id: string
    user?: UserEntity
}