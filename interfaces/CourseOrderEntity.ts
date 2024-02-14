import BaseEntity from "./BaseEntity";
import CourseEntity from "./CourseEntity";
import UserEntity from "./UserEntity";

export interface CourseOrderEntity extends BaseEntity {
    endTime: Date;

    courseId: number;

    course?: CourseEntity

    userId: number;

    user?: UserEntity

    money: number;

    status: "obligation" | "paid"
}