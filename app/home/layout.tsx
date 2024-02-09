import Container from "@/components/Container"
import { authQuery } from "@/hooks/useAuth"
import HomeMenu from "./HomeMenu";



const HomeLayout = async ({ children }: React.PropsWithChildren) => {
    const user = await authQuery("/home");
    return (
        <Container>
            <div className="flex gap-3">
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