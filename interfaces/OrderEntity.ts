import BaseEntity from "./BaseEntity";



export interface OrderEntity extends BaseEntity {
    comment?: string
    total: number
    transaction_id: string
}