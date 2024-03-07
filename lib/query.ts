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

export const giteeLogin = (code: string) => fetch(`${baseURL}/gitee/auth?code=${code}`)
// export const uploadCourseContextPost = (hash_key: string, data: any) => query.post(`/course/${hash_key}/context`, data)

// export const uploadContextPost = (hash_key: string, data: any) => query.post(`/content/${hash_key}/context`, data)

export default query