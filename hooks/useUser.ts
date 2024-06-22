import { useQuery } from "@apollo/client";
import viewer from "@/queries/viewer.gql"

const useUser = () => {
    const res = useQuery<{ viewer: any }>(viewer);
    return res
}

export default useUser