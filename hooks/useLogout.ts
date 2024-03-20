import { setCookie } from "@/lib/cookie"


const useLogout = () => {
    return () => {
        setCookie("token", "")
        window.location.href = "/auth"
    }
}
export default useLogout