import { giteeLogin } from "@/lib/query"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"


export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    if (!code) redirect("/auth")
    const headers = new Headers();
    const token = cookies().get("token")?.value
    headers.append("authorization", `Bearer ${token}`);
    console.log(headers)
    const res = await (await giteeLogin(code, headers)).json()
    return Response.json(res)
    redirect("/home")
}