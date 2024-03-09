import BaseEntity from "./BaseEntity";
import CourseChapterEntity from "./CourseChapterEntity";
import CourseContentEntity from "./CourseContentEntity";
import { CourseOrderEntity } from "./CourseOrderEntity";
import CourseTypeEntity from "./CourseTypeEntity";
import UserHeadCourseEntity from "./UserHeadCourseEntity";
import { CourseStatus } from "./enums";

export const CourseFields = `
    id
    createAt
    updateAt
    courseTypeId
    type
    status
    hash_key
    name
    price
    prePrice
    keywords
    description
`
export default interface CourseEntity extends BaseEntity {
    courseTypeId: number

    type?: CourseTypeEntity

    status: CourseStatus

    hash_key: string;

    name: string;

    price: number;

    prePrice?: number;

    keywords: string;

    description?: string

    head?: UserHeadCourseEntity[]

    CourseOrder?: CourseOrderEntity[]

    CourseContent?: CourseContentEntity[]

    CourseChapter?: CourseChapterEntity[]
}