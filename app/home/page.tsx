"use client"
import useClientViewer from "@/hooks/useClientViewer"
import HomeInformationPage from "./information/page"
import UserNameAvatar from "@/components/UserNameAvatar";

const UserHomePage = () => {
    const { data } = useClientViewer();
    const user = data?.viewer
    return (
        <div className="block sm:hidden">
            <UserNameAvatar
                user={user}
            />
        </div>
    )
}
const HomePage = () => {
    return (
        <div>
            <div className="hidden sm:block">
                <HomeInformationPage />
            </div>
            <UserHomePage />
        </div>
    )
}
export default HomePage