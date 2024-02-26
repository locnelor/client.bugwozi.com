import { useQuery } from "@apollo/client";
import viewer from "@/queries/viewer.gql"
import User from "@/interfaces/UserEntity";

const useUser = () => {
    const res = useQuery<{ viewer: User }>(viewer);
    return res
}

export default useUser