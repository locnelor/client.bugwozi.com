import BaseEntity from "./BaseEntity";
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
}