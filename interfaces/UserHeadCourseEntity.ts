import CourseEntity from "./CourseEntity";
import UserEntity, { UserFields } from "./UserEntity";

export const UserHeadCourseFields=`
    userId
    user{
        ${UserFields}
    }
    courseId
`
export default interface UserHeadCourseEntity {
    userId: number;

    user?: UserEntity

    courseId: number;

    course?: CourseEntity
}