import BaseEntity from "./BaseEntity";
import CourseChapterEntity from "./CourseChapterEntity";
import CourseContentEntity from "./CourseContentEntity";
import { CourseOrderEntity } from "./CourseOrderEntity";
import CourseTypeEntity from "./CourseTypeEntity";
import UserHeadCourseEntity from "./UserHeadCourseEntity";


export default interface CourseEntity extends BaseEntity {
    courseTypeId: number

    type?: CourseTypeEntity

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