import Container from "@/components/Container"
import { authQuery } from "@/hooks/useAuth"
import HomeMenu from "./HomeMenu";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "个人中心"
}

const HomeLayout = async ({ children }: React.PropsWithChildren) => {
    const user = await authQuery("/home");
    return (
        <Container>
            <div className="flex gap-5">
                <HomeMenu
                    user={user.viewer}
                />
                <div className="grow">
                    {children}
                </div>
            </div>
        </Container>
    )

}
export default HomeLayout