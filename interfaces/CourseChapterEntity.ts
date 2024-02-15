import BaseEntity from "./BaseEntity";
import CourseContentEntity from "./CourseContentEntity";
import CourseEntity from "./CourseEntity";


export default interface CourseChapterEntity extends BaseEntity {
    name: string;

    CourseContent?: CourseContentEntity[]

    courseId: number;

    course?: CourseEntity
}