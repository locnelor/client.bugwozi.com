import { giteeLogin } from "@/lib/query"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    if (!code) redirect("/auth")
    const { access_token } = await (await giteeLogin(code)).json()
    cookies().set({
        name: "token",
        value: access_token,
        path: "/"
    })
    redirect("/home")
}