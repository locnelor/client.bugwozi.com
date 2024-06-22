import { message } from "antd";



export const gqlError = (error: any, title = "发生了一些错误") => message.error({
    content: `${title}:${error.message}`
})
export const gqlSuccess = (content = "操作成功") => message.success({ content })