import { redirect } from "next/navigation"

export async function GET(request: Request) {
    const baseUrl = "https://gitee.com/oauth/authorize";
    const params: {
        [k in string]?: string
    } = {
        client_id: process.env.NEXT_PUBLIC_GITEE,
        redirect_uri: encodeURI(process.env.NEXT_PUBLIC_GITEE_REDIRECT || ""),
        response_type: "code"
    }
    const url = `${baseUrl}?${Object.keys(params).map((key) => {
        return `${key}=${params[key]}`
    }).join("&")}`
    redirect(url)
}