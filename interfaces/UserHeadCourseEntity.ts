import CourseEntity from "./CourseEntity";
import UserEntity from "./UserEntity";


export default interface UserHeadCourseEntity {
    userId: number;

    user?: UserEntity

    courseId: number;

    course?: CourseEntity
}