"use client"

import User from "@/interfaces/User";
import { useQuery } from "@apollo/client";
import viewer from "@/queries/viewer.gql"

const useClientViewer = () => {
    const { data, loading, error } = useQuery<{ viewer: User }>(viewer)
    return { data, loading, error }
}
export default useClientViewer