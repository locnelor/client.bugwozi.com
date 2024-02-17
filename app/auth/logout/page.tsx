"use client"
import { setCookie } from "@/lib/cookie";
import navigate from "@/lib/navigate";
import { useApolloClient } from "@apollo/client";
import { useEffect } from "react"


const Logout = () => {
    const store = useApolloClient();
    useEffect(() => {
        setCookie("token", "");
        store.resetStore().then(() => {
            navigate("/auth")
        })
    }, []);
    return (
        <div className="h-96">

        </div>
    )
}
export default Logout