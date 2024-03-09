import BaseEntity from "./BaseEntity";
import { ContentOnUserEntity } from "./ContentOnUserEntity.entity";
import CourseChapterEntity from "./CourseChapterEntity";
import CourseEntity from "./CourseEntity";


export default interface CourseContentEntity extends BaseEntity {
    name: string;

    description: string;

    courseChapterId: number;

    chapter?: CourseChapterEntity

    hash_key: string;

    type: "FREE" | "PAID"

    courseId: number;

    course?: CourseEntity

    order: number

    keywords: string

    authors?: ContentOnUserEntity[]
}
export const CourseContentFields = `
     id
    name
    hash_key
    type
    keywords
    order
    courseChapterId
`