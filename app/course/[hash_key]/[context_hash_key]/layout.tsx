import { LayoutProps } from "@/interfaces/page"


const CourseContextLayout = ({
    params: {
        hash_key,
        context_hash_key
    },
    children
}: LayoutProps<{}, {
    hash_key: string,
    context_hash_key: string
}>) => {

    return children
}
export default CourseContextLayout