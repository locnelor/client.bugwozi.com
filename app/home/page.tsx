
import UiDivider from "@/components/ui/UiDivider"
import { authQuery } from "@/hooks/useAuth"



const HomePage = async () => {
    const { viewer } = await authQuery()

    return (
        <div>
            <h1 className="text-2xl">个人信息</h1>
            <UiDivider />
            
        </div>
    )
}
export default HomePage