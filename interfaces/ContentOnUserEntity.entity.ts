import CourseContentEntity from "./CourseContentEntity";
import UserEntity from "./UserEntity";

export interface ContentOnUserEntity {
    userId: number;

    user?: UserEntity

    courseContentId: number;

    content?: CourseContentEntity
}