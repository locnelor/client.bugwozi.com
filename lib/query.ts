import axios from "axios"
import { getCookie } from "./cookie"
const query = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
    withCredentials: true
})
query.interceptors.request.use(config => {
    const token = getCookie("token");
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export const uploadContextPost = (hash_key: string, data: FormData) => query.post(`/course/${hash_key}/context`, data)

export default query