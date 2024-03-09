import axios from "axios"
import { getCookie } from "./cookie"
const baseURL = process.env.NEXT_PUBLIC_API_URL
const query = axios.create({
    baseURL,
    withCredentials: true
})
query.interceptors.request.use(config => {
    const token = getCookie("token");
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export const giteeLogin = (code: string, headers: any) => fetch(`${baseURL}/gitee/auth?code=${code}`, {
    headers
})
// export const uploadCourseContextPost = (hash_key: string, data: any) => query.post(`/course/${hash_key}/context`, data)

// export const uploadContextPost = (hash_key: string, data: any) => query.post(`/content/${hash_key}/context`, data)
export const uploadContext = (type: string, hash_key: string, context: string, __html: string) => query.post(`/context/${hash_key}/${type}/upload`, { type, hash_key, context, __html })
export const uploadMedia = (type: string, hash_key: string, base64: string) => query.post(`/context/${hash_key}/${type}/media`, { base64 })
export default query
