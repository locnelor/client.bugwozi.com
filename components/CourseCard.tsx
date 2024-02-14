import CourseEntity from "@/interfaces/CourseEntity"
import UiCard, { UiCardActions, UiCardBody, UiCardFigure, UiCardTitle } from "./ui/UiCard"
import { GearIcon } from "@radix-ui/react-icons"
import UiDropdownMenu, { UiDropdownMenuItem } from "./ui/DropdownMenu"
import UiButton from "./ui/UiButton"
import { useCallback } from "react"
import UiModal, { UiModalConfirmFooter, UiModalTitle, openModal, useModalEvent } from "./ui/UiModal"

export type PriceTagProps = {
    price: number,
    prePrice?: number
}
export const PriceTag = ({
    price,
    prePrice
}: PriceTagProps) => {
    if (price === 0) return '免费'
    if (!!prePrice) {
        return (
            <span>
                {prePrice}
                <span>-{price}-</span>
            </span>
        )
    }
    return <div>{price}</div>
}

const DelModalFooter = ({ destory }: any) => {
    
    return (
        <div>
            <div>删除后无法恢复，确认要删除吗？</div>
            <UiModalConfirmFooter
                onCancel={destory}
                onOk={destory}
                loading
            />
        </div>
    )
}
export type CourseCardProps = {
    readOnly?: boolean,
    data?: CourseEntity
}
const CourseCard = ({
    readOnly = false,
    data
}: CourseCardProps) => {
    const onOpenDelModal = useCallback(() => {
        if (!data) return;
        openModal((destory) => ({
            title: `删除 课程 ${data.name}`,
            children: <DelModalFooter destory={destory} />
        }))
    }, [data]);


    if (!data) return (
        <UiCard>
            <div className="h-36 w-56 skeleton" />
        </UiCard>
    )
    return (
        <UiCard className="w-56 relative">
            {!readOnly && <UiDropdownMenu
                trigger={
                    <UiButton
                        size="sm"
                        circle
                        type="ghost"
                        className="absolute right-2 top-2"
                    >
                        <GearIcon />
                    </UiButton>
                }
            >
                <UiDropdownMenuItem
                    onClick={onOpenDelModal}
                >
                    删除
                </UiDropdownMenuItem>
                <UiDropdownMenuItem>
                    修改
                </UiDropdownMenuItem>
            </UiDropdownMenu>}
            <UiCardFigure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></UiCardFigure>
            <UiCardBody className="card-body">
                <UiCardTitle>{data.name}</UiCardTitle>
                <p>{data.description}</p>
                <UiCardActions>
                    <div>价格:<PriceTag price={data.price} prePrice={data.prePrice} /></div>
                </UiCardActions>
            </UiCardBody>
        </UiCard>
    )
}
export default CourseCard