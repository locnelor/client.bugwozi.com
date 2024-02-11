import BaseEntity from "./BaseEntity";
import UserEntity from "./UserEntity";

export interface UserOnClassesEntity {
    classesId: number;
    classes: ClassesEntity
    userId: number;
    user: UserEntity
    isAdmin: boolean;
}
interface ClassesEntity extends BaseEntity {
    hash_key: string
    name: string;
    master: UserEntity
    masterId: number;
    description: string;
    UserOnClasses?: UserOnClassesEntity[]
}
export default ClassesEntity