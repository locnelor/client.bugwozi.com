import BaseEntity from "./BaseEntity";
import CourseContentEntity from "./CourseContentEntity";


export default interface CourseChapterEntity extends BaseEntity {
    name: string;

    CourseContent?: CourseContentEntity[]
}