import { PageProps } from "@/interfaces/page"
import { gql } from "@apollo/client"


const GetCourseContextQuery = gql`
    query GetCourseContext($hash_key:String!){
        getCourseContext(hash_key:$hash_key){
            id
            createAt
            description
            hash_key
            keywords
            free
        }
    }
`

const CourseContextPage = ({
    params: {
        hash_key,
        context_hash_key
    }
}: PageProps<{}, {
    hash_key: string,
    context_hash_key: string
}>) => {


    return (
        <div>
            {hash_key}
            -
            {context_hash_key}
        </div>
    )
}
export default CourseContextPage