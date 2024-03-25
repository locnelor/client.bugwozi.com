import UiModal, { UiModalTitle } from "@/components/ui/UiModal"
import { gql, useMutation, useQuery } from "@apollo/client"
import { useCallback, useEffect, useRef, useState } from "react"



const QueryWechatQrcodeMutation = gql`
    mutation QueryWechatQrcode($ticket:String!){
        queryWechatQrcode(ticket:$ticket)
    }
`
const GetWechatQrcodeQuery = gql`
    query GetWechatQrcode{
        getWechatQrcode
    }
`
const CodeRender = () => {
    const {
        data,
        refetch
    } = useQuery(GetWechatQrcodeQuery);
    const [query, {
        data: res
    }] = useMutation(QueryWechatQrcodeMutation, {
        onCompleted(data) {
            if (!data) return;
            window.location.href = data;
        },
    });
    const onClick = useCallback(() => {
        refetch();
    }, [])
    useEffect(() => {
        if (!data) return;
        const time = setTimeout(() => {
            query({
                variables: {
                    ticket: data
                }
            })
        }, 1000);
        return () => {
            clearTimeout(time)
        }
    }, [data, res]);
    if (!!data) return (
        <img
            className="mask mask-square"
            onClick={onClick}
            src={`https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${data}`}
        />
    )
    return (
        <div
            className="skeleton w-32 h-32"
        />
    )
}
const WxQrcode = ({
    children
}: React.PropsWithChildren) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDialogElement>(null);
    const onOpen = useCallback(() => {
        ref.current?.showModal()
        setOpen(true);
    }, [])
    const onCancel = useCallback(() => {
        ref.current?.close();
        setOpen(false);
    }, [])
    return (
        <div>
            <UiModal
                onCancel={onCancel}
            >
                <UiModalTitle>微信扫码登录</UiModalTitle>
                {!!open && (
                    <CodeRender />
                )}
            </UiModal>
            <div onClick={onOpen}>
                {children}
            </div>
        </div>
    )
}

export default WxQrcode