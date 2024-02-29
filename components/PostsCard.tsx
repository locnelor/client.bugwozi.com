"use client"
import { PostsEntity } from "@/interfaces/PostsEntity"
import UiCard from "./ui/UiCard"
import UserNameAvatar from "./UserNameAvatar"
import UiTags from "./ui/UiTags"
import moment from "moment"
import Link from "next/link"
import { useCallback, useMemo } from "react"
import { gql, useMutation } from "@apollo/client"
import UiModal, { UiModalTitle, openInformationModal, openModal, useModalEvent } from "./ui/UiModal"
import UiDropdownMenu, { UiDropdownMenuItem } from "./ui/DropdownMenu"
import { GearIcon } from "@radix-ui/react-icons"
import UiButton from "./ui/UiButton"
import PostsForm from "./PostsForm"
import { fileShear } from "@/lib/img"



const DelPostsMutation = gql`
    mutation DelPosts(
        $id:Int!
    ){
        delPosts(id:$id){
            message
        }
    }
`
const UpdPostsMutation = gql`
    mutation UpdPosts(
        $id:Int!,
        $name:String!,
        $tags:String!,
        $avatar:String,
        $description:String,
        $status:String!
    ){
        updPosts(
            id:$id,
            name:$name,
            tags:$tags,
            avatar:$avatar,
            description:$description,
            status:$status
        ){
            id
        }
    }
`
export type PostsCardProps = {
    posts: PostsEntity,
    readOnly?: boolean,
    refetch?: () => void,
}
const PostsCard = ({
    posts,
    readOnly = false,
    refetch
}: PostsCardProps) => {
    const [delPosts] = useMutation(DelPostsMutation)
    const [updModalRef, onOpenUpdModal, onCancelUpdModal] = useModalEvent()
    const [updPosts, { loading }] = useMutation(UpdPostsMutation, {
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
    })
    const onOpenDelModal = useCallback((id: number) => {
        if (!posts) return;
        openModal(() => ({
            title: `删除 文章 ${posts.name}`,
            children: "删除后无法恢复，确认要删除吗？",
            onOk() {
                return delPosts({
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
    }, [posts])
    const onUpdPosts = useCallback(async ({ file, ...rest }: any) => {
        const avatar = (!!file && file.size != 0) ? await fileShear(file, 300, 200) : undefined;
        updPosts({
            variables: {
                avatar,
                id: posts.id,
                ...rest
            }
        })
    }, [posts]);
    const dropdown = useMemo(() => {
        if (readOnly || !posts) return null;
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
                <Link href={`/home/admin/posts/${posts.hash_key}`}>
                    <UiDropdownMenuItem
                        onClick={onOpenDelModal.bind(null, posts.id)}
                    >
                        编辑内容
                    </UiDropdownMenuItem>
                </Link>
                <UiDropdownMenuItem
                    onClick={onOpenDelModal.bind(null, posts.id)}
                >
                    删除
                </UiDropdownMenuItem>
                <UiDropdownMenuItem
                    onClick={onOpenUpdModal}
                >
                    修改
                </UiDropdownMenuItem>
            </UiDropdownMenu>
        )
    }, [readOnly])
    return (
        <UiCard
            className="relative lg:card-side overflow-hidden"
        >
            <UiModal
                ref={updModalRef}
            >
                <UiModalTitle>修改课程信息</UiModalTitle>
                <PostsForm
                    loading={loading}
                    onSubmit={onUpdPosts}
                    defaultValue={posts}
                />
            </UiModal>
            <figure>
                <img src={`${process.env.NEXT_PUBLIC_API_URL}/media/posts/${posts.hash_key}/avatar`} alt="" />
                {dropdown}
            </figure>
            <div className="card-body ">
                <h2 className="card-title">
                    <Link href={`/posts/${posts.hash_key}`}>
                        {posts.name}
                    </Link>
                </h2>
                <p>
                    <Link href={`/posts/${posts.hash_key}`}>
                        {posts.description}
                    </Link>
                </p>
                <div className="card-actions justify-between flex-wrap items-center">
                    <UserNameAvatar
                        user={posts.author}
                    />
                    <UiTags
                        defaultValue={posts.tags}
                        readOnly
                    />
                    <div>
                        修改时间:{moment(posts.updateAt).format("YYYY-MM-DD")}
                    </div>
                </div>
            </div>
        </UiCard>
    )
}
export default PostsCard