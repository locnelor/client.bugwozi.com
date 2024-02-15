import { PageProps } from "@/interfaces/page"


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