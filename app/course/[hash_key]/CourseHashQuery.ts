import { gql } from "@apollo/client"

const CourseHashQuery = gql`
    query CourseHashQuery($hash_key:String!){
        courseHashQuery(hash_key:$hash_key){
            id
            hash_key
            description
            name
            keywords
            createAt
            updateAt
            head{
                user{
                    id
                    name
                    hash_key
                }
            }
            CourseChapter{
                name
                id
                createAt
                updateAt
                order
                CourseContent{
                    id
                    name
                    hash_key
                    type
                    keywords
                    order
                    courseChapterId
                }
            }
        }
        courseEditPower(hash_key:$hash_key)
    }
`
export default CourseHashQuery