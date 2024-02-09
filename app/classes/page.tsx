import Container from "@/components/Container"
import { authQuery } from "@/hooks/useAuth"
import { getQuery } from "@/lib/client"
import gql from "graphql-tag"
import { redirect } from "next/navigation"
import ClassesEmpty from "./ClassesEmpty"

const GetMyClassesQuery = gql`
    query{
        getMyClasses{
            id
            name
            masterId
            description
        }
    }
`
const ClassesPage = async () => {
    await authQuery("/classes");
    const { data, error } = await getQuery<any>(GetMyClassesQuery);
    if (!!error) return redirect("/500")
    const classes = data.getMyClasses;

    if (!classes.length) return (
        <ClassesEmpty />
    )
    return (
        <Container>
            <div className="flex">
                {JSON.stringify(classes)}
            </div>
        </Container>
    )
}
export default ClassesPage