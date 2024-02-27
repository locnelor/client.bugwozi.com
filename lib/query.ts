import axios from "axios"
import { getCookie } from "./cookie"
const query = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true
})
query.interceptors.request.use(config => {
    const token = getCookie("token");
    config.headers.Authorization = `Bearer ${token}`
    return config
})

// export const uploadCourseContextPost = (hash_key: string, data: any) => query.post(`/course/${hash_key}/context`, data)

// export const uploadContextPost = (hash_key: string, data: any) => query.post(`/content/${hash_key}/context`, data)

export default query