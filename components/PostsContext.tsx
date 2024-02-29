import { PostsEntity } from "@/interfaces/PostsEntity"
import PostsCard from "./PostsCard"

export type PostsContextProps = {
    data: PostsEntity[],
    refetch?: () => void,
    readOnly?: boolean
}
const PostsContext = ({
    data,
    refetch,
    readOnly = false
}: PostsContextProps) => {

    return (
        <div className="container m-auto">
            {data.map((item, key) => (
                <PostsCard
                    posts={item}
                    key={key}
                    refetch={refetch}
                    readOnly={readOnly}
                />
            ))}
        </div>
    )
}
export default PostsContext