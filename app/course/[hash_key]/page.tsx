import { PageProps } from "@/interfaces/page"
import { getQuery } from "@/lib/client"
import { gql } from "@apollo/client"


const getCourseInformationQuery = gql`
    query GetCourseInformation($hash_key:String!){
        getCourseInformation(hash_key:$hash_key){
            id
        }
    }
`
const CourseIdPage = async ({
    params: {
        hash_key
    }
}: PageProps<{}, { hash_key: string }>) => {
    const { data } = await getQuery(getCourseInformationQuery, {
        hash_key
    })


    return (
        <div>
            123
        </div>
    )
}
export default CourseIdPage