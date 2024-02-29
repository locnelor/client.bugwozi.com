import BaseEntity from "./BaseEntity";
import UserEntity, { UserFields } from "./UserEntity";
import { CourseStatus } from "./enums";


export interface PostsEntity extends BaseEntity {
    hash_key: string;

    description: string;

    userId: number;

    status: CourseStatus;

    name: string

    author?: UserEntity

    context?: string

    tags: string
}
export const PostsFields = `
    id
    createAt
    updateAt
    hash_key
    description
    userId
    status
    name
    author{
        ${UserFields}
    }
    context
    tags
`