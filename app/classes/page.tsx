import Container from "@/components/Container"
import { authQuery } from "@/hooks/useAuth"
import { getQuery } from "@/lib/client"
import gql from "graphql-tag"
import { redirect } from "next/navigation"
import ClassesEmpty from "./[hash_key]/ClassesEmpty"


const ClassesPage = async () => {



    // if (!classes.length) return (
    //     <ClassesEmpty />
    // )
    return (
        <Container>
            <div className="flex">
                
            </div>
        </Container>
    )
}
export default ClassesPage