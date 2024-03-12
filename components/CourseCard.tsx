"use client"

import CourseEntity from "@/interfaces/CourseEntity"
import UiCard, { UiCardActions, UiCardBody, UiCardFigure, UiCardTitle } from "./ui/UiCard"
import { GearIcon } from "@radix-ui/react-icons"
import UiDropdownMenu, { UiDropdownMenuItem } from "./ui/DropdownMenu"
import UiButton from "./ui/UiButton"
import { useCallback, useMemo } from "react"
import UiModal, { UiModalTitle, openInformationModal, openModal, useModalEvent } from "./ui/UiModal"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import CourseForm from "./CourseForm"
import { file2base64, fileShear } from "@/lib/img"
import CourseHead from "./CourseHead"
import Link from "next/link"

export type PriceTagProps = {
    price: number,
    prePrice?: number
}
export const PriceTag = ({
    price,
    prePrice
}: PriceTagProps) => {
    //两种价格为0，免费课
    if (price === 0 && prePrice === 0) return "免费"

    //两种价格相等，没有促销。
    if (price === prePrice) return `¥${price}`;

    //price为0，限时免费，其余的折扣
    return <span>{price === 0 ? "限时免费" : `¥${price}`} <span className="line-through">¥{prePrice}</span></span>
}

const DelCourseMutation = gql`
    mutation DelCourseMutation($id:Int!){
        delCourse(id:$id){
            message
        }
    }
`
const UpdCourseMutation = gql`
    mutation UpdCourseMutation(
        $id:Int!,
        $name:String!,
        $price:Float!,
        $prePrice:Float!,
        $keywords:String!,
        $type:String!,
        $status:String!,
        $avatar:String
    ){
        updCourse(
            id:$id,
            name:$name,
            price:$price,
            prePrice:$prePrice,
            avatar:$avatar,
            type:$type,
            status:$status,
            keywords:$keywords
        ){
            message
        }
    }
`

export type CourseCardProps = {
    readOnly?: boolean,
    data?: CourseEntity,
    refetch?: () => void
}
const CourseCard = ({
    readOnly = false,
    data,
    refetch
}: CourseCardProps) => {
    const [delCourse] = useMutation(DelCourseMutation)
    const [updModalRef, onOpenUpdModal, onCancelUpdModal] = useModalEvent()
    const [updHeadModalRef, onOpenHeadModal, onCancelHeadModal] = useModalEvent()
    const [updCourse, {
        loading
    }] = useMutation(UpdCourseMutation, {
        onError(error) {
            openInformationModal(() => ({
                title: "发生了一些错误。。",
                children: error.message
            }))
        },
        onCompleted() {
            onCancelUpdModal()
            if (!!refetch) refetch()
        },
    });
    const onOpenDelModal = useCallback((id: number) => {
        if (!data) return;
        openModal(() => ({
            title: `删除 课程 ${data.name}`,
            children: "删除后无法恢复，确认要删除吗？",
            onOk() {
                return delCourse({
                    variables: {
                        id
                    }
                }).then(() => {
                    if (!!refetch) refetch()
                    return true;
                }).catch(({ message }) => {
                    openModal(() => ({
                        title: "删除失败",
                        children: message
                    }))
                    return true;
                })
            },
        }))
    }, [data, refetch]);
    const onUpdCourse = useCallback(async ({ file, price, prePrice, ...rest }: any) => {
        if (!data) return;
        const avatar = (!!file && file.size != 0) ? await fileShear(file, 300, 200) : undefined
        updCourse({
            variables: {
                avatar,
                id: data.id,
                price: parseFloat(`${price}`),
                prePrice: parseFloat(`${!!prePrice ? prePrice : price}`),
                ...rest
            }
        })
    }, [data])

    const dropdown = useMemo(() => {
        if (readOnly || !data) return null;
        return (
            <UiDropdownMenu
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
                    onClick={onOpenDelModal.bind(null, data.id)}
                >
                    删除
                </UiDropdownMenuItem>
                <UiDropdownMenuItem
                    onClick={onOpenUpdModal}
                >
                    修改
                </UiDropdownMenuItem>
                <UiDropdownMenuItem
                    onClick={onOpenHeadModal}
                >
                    查看负责人
                </UiDropdownMenuItem>
            </UiDropdownMenu>
        )
    }, [readOnly, onOpenDelModal, onOpenUpdModal, data])
    if (!data) return (
        <UiCard>
            <div className="h-36 w-56 skeleton" />
        </UiCard>
    )
    return (
        <UiCard className="relative sm:w-56 w-full">
            {dropdown}
            <UiCardFigure className="h-36 overflow-hidden">
                <Link href={`/course/${data.hash_key}`}>
                    <img src={`${process.env.NEXT_PUBLIC_API_URL}/course/${data.hash_key}/avatar`} alt="Shoes" />
                </Link>
            </UiCardFigure>
            <UiCardBody className="card-body">
                <Link href={`/course/${data.hash_key}`}>
                    <UiCardTitle>{data.name}</UiCardTitle>
                </Link>
                <UiCardActions>
                    <div><PriceTag price={data.price} prePrice={data.prePrice} /></div>
                </UiCardActions>
            </UiCardBody>
            <UiModal
                ref={updModalRef}
            >
                <UiModalTitle>修改课程信息</UiModalTitle>
                <CourseForm
                    loading={loading}
                    onSubmit={onUpdCourse}
                    defaultValue={data}
                />
            </UiModal>
            <UiModal
                ref={updHeadModalRef}
            >
                <UiModalTitle>修改课程负责人</UiModalTitle>
                <CourseHead
                    data={data}
                    refetch={refetch}
                />
            </UiModal>
        </UiCard>
    )
}
export default CourseCard