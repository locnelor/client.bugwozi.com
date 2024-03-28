import { useEffect, useState } from "react"
import UiDivider from "./ui/UiDivider"


export type PayQrcodeCardProps = {
    loading?: boolean,
    total: number,
    title: string,
    base64?: string,
    refetch: () => void,
    query: () => void,
    error?: any
}
const PayQrcodeCard = ({
    loading,
    total,
    title,
    base64,
    refetch,
    query,
    error
}: PayQrcodeCardProps) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        refetch()
    }, []);
    useEffect(() => {
        if (loading) return;
        if (!base64) return;
        const time = setTimeout(() => {
            query()
            setCount(count + 1);
        }, 1500);
        return () => clearTimeout(time);
    }, [base64, loading, count])
    if (loading || !base64) return (
        <div className="w-56 h-56 skeleton" />
    )
    if (!!error) return (
        <div
            onClick={refetch}
            className="w-56 cursor-pointer h-56 flex justify-center items-center"
        >
            验证码获取失败
        </div>
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
                <div className="min-w-56 min-h-56 flex justify-center">
                    <img src={base64} />
                </div>
                <div className="text-center">
                    请使用微信扫码支付
                </div>
                <UiDivider >
                    其他支付方式
                </UiDivider>
                <div className="card-actions justify-center">
                    暂无数据
                    {/* <button className="btn">使用支付宝支付</button> */}
                </div>
            </div>
        </div>
    )
}
export default PayQrcodeCard