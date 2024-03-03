"use client"
import useClientViewer from "@/hooks/useClientViewer";
import HomeInformationContext from "./HomeInformationContext"
import { useMemo } from "react";



const HomeInformationPage = () => {
    const { data } = useClientViewer();
    const user = useMemo(() => data?.viewer, [data]);
    if (!user) return null;
    return (
        <HomeInformationContext
            user={user}
        />
    )
}
export default HomeInformationPage