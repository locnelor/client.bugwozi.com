"use client"
import UiDivider from "@/components/ui/UiDivider"
import AddPosts from "./AddPosts"
import AllCourse from "@/queries/AllCourse.gql"
import { useQuery } from "@apollo/client"

const HomePostsPage = () => {
    const {
        data,
        loading,
        error,
        refetch
    } = useQuery(AllCourse)

    return (
        <div>
            <AddPosts
                refetch={refetch}
            />
            <UiDivider />

        </div>
    )
}
export default HomePostsPage