import Container from "@/components/Container";
import { authQuery } from "@/hooks/useAuth";
import ClassesMenu from "./ClassesMenu";


const ClassesLayout = async ({ children }: React.PropsWithChildren) => {
    const { viewer } = await authQuery("/classes");

    return (
        <Container>
            <div className="flex gap-2">
                <ClassesMenu
                    user={viewer}
                />
                <div className="grow">
                    {children}
                </div>
            </div>
        </Container>
    )
}
export default ClassesLayout