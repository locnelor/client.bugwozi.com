import CourseEntity from "./CourseEntity"


export default interface CourseTypeEntity {
    id: number
    name: string
    course?: CourseEntity[]
}