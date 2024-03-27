import { useEffect } from "react"
import UiDivider from "./ui/UiDivider"


export type PayQrcodeCardProps = {
    loading?: boolean,
    total: number,
    title: string
}
const PayQrcodeCard = ({
    loading,
    total,
    title
}: PayQrcodeCardProps) => {
    // const {} = useQuery()
    useEffect(() => {

    }, []);
    if (loading) return (
        <div className="w-56 h-56 skeleton" />
    )
    return (
        <div className="card shadow">
            <div className="card-body">
                <h2 className="card-title text-center">{title}</h2>
                <div className="flex">
                    <div className="w-1/2">
                        应付金额
                    </div>
                    <div className="w-1/2 text-right">
                        {total / 100}元
                    </div>
                </div>
                <div className="w-56 h-56 skeleton">
                    qrcode
                </div>
                <div className="text-center">
                    请使用微信扫码支付
                </div>
                <UiDivider >
                    其他支付方式
                </UiDivider>
                <div className="card-actions justify-center">
                    <button className="btn">使用支付宝支付</button>
                </div>
            </div>
        </div>
    )
}
export default PayQrcodeCard