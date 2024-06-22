"use client"

import { useQuery } from "@apollo/client";
import viewer from "@/queries/viewer.gql"
const useClientViewer = () => {
    const { data, loading, error } = useQuery<{ viewer: any }>(viewer)
    return { user: data?.viewer, loading, error }
}
export default useClientViewer