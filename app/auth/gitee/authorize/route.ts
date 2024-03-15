import { giteeLogin } from "@/lib/query"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"


export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    console.log("client authorize")
    if (!code) redirect("/auth")
    const headers = new Headers();
    const token = cookies().get("token")?.value
    headers.append("authorization", `Bearer ${token}`);
    const result = await (await giteeLogin(code, headers)).json()
    if (!!result.redirect) redirect(result.redirect)
    if (!!result.access_token) {
        cookies().set("token", result.access_token);
        redirect("/home")
    }
    redirect("/auth")
}