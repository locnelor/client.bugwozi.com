import { CourseChapterFields } from "@/interfaces/CourseChapterEntity";
import { CourseContentFields } from "@/interfaces/CourseContentEntity";
import { CourseFields } from "@/interfaces/CourseEntity";
import { UserHeadCourseFields } from "@/interfaces/UserHeadCourseEntity";
import { gql } from "@apollo/client";

export const GetCourseContextQuery = gql`
    query GetCourseContext($hash_key:String!,$type:String!){
        getContextPowers(hash_key:$hash_key,type:$type)
        getCourseContext(hash_key:$hash_key){
            ${CourseFields}
            head{
                ${UserHeadCourseFields}
            }
            CourseChapter{
                ${CourseChapterFields}
                CourseContent{
                    ${CourseContentFields}
                }
            }
        }
    }
`