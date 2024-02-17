import BaseEntity from "./BaseEntity";
import CourseChapterEntity from "./CourseChapterEntity";
import CourseContentEntity from "./CourseContentEntity";
import { CourseOrderEntity } from "./CourseOrderEntity";
import UserHeadCourseEntity from "./UserHeadCourseEntity";


export default interface CourseEntity extends BaseEntity {
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