"use client"

import UiButton from "@/components/ui/UiButton"
import UiModal, { UiModalTitle, openInformationModal, openModal, useModalEvent } from "@/components/ui/UiModal"
import CourseEntity from "@/interfaces/CourseEntity"
import ChapterForm from "./ChapterForm"
import { useMutation, useQuery } from "@apollo/client"
import { useCallback, useMemo, useState } from "react"
import CourseHashQuery from "../CourseHashQuery"
import { gql } from "@apollo/client"
import ContextForm from "./ContextForm"
import { LineHeightIcon } from "@radix-ui/react-icons"
import CourseChapterEntity from "@/interfaces/CourseChapterEntity"
import { UiFormSubmit } from "@/components/ui/UiForm"
import CourseContentEntity from "@/interfaces/CourseContentEntity"

const addChapterMutation = gql`
    mutation AddChapter(
        $courseId:Int!,
        $order:Int!,
        $name:String!,
        $id:Int
    ){
        addChapter(
            courseId:$courseId,
            order:$order,
            name:$name,
            id:$id
        ){
            message
        }
    }
`
const delChapterMutation = gql`
    mutation DelChapter(
        $id:Int!
    ){
        delChapter(id:$id){
            message
        }
    }
`
const addContextMutation = gql`
    mutation AddContext(
        $chapterId:Int!,
        $name:String!,
        $order:Int!,
        $keywords:String!,
        $type:String!,
        $id:Int
    ){
        addContext(
            chapterId:$chapterId,
            name:$name,
            order:$order,
            keywords:$keywords,
            type:$type,
            id:$id
        ){
            message
        }
    }
`
const delContextMutation = gql`
    mutation delContext(
        $id:Int!
    ){
        message
    }
`
type CourseChapterMenuRenderProps = React.PropsWithChildren<{
    chapter: CourseChapterEntity,
    refetch: () => void,
    courseId: number
}>
const CourseChapterMenuRender = ({
    chapter,
    children,
    courseId,
    refetch
}: CourseChapterMenuRenderProps) => {
    const [loading, setLoading] = useState(false);
    const [updChapter] = useMutation(addChapterMutation);
    const [delChapter] = useMutation(delChapterMutation);
    const onUpdChapter = useCallback((destory: any, { order, ...data }: any) => {
        setLoading(true);
        return updChapter({
            variables: {
                order: parseInt(order),
                courseId,
                id: chapter.id,
                ...data
            }
        }).then(() => {
            openInformationModal(() => ({ title: "修改成功" }))
            refetch();
            destory()
            return true;
        }).catch((e) => {
            openInformationModal(() => ({ title: "修改失败", children: e.message }))
            return false;
        }).finally(() => setLoading(false))
    }, [chapter]);
    const onDel = useCallback((destory: any) => {
        openModal(() => ({
            title: "删除章节",
            children: "删除后不可恢复，确认要删除吗？",
            onOk: () => {
                return delChapter({
                    variables: {
                        id: chapter.id
                    }
                }).then(() => {
                    openInformationModal(() => ({ title: "删除成功" }))
                    destory()
                    refetch()
                    return true;
                }).catch((e) => {
                    openInformationModal(() => ({ title: "删除失败", children: e.message }))
                    return false;
                })
            }
        }))
    }, [chapter]);
    const onClick = useCallback(() => {
        openModal((destory) => ({
            title: "修改章节",
            children: <ChapterForm
                onSubmit={onUpdChapter.bind(null, destory)}
                defaultValue={chapter}
                loading={loading}
            >
                <UiFormSubmit>
                    <UiButton
                        className="ml-2"
                        onClick={onDel.bind(null, destory)}
                        color="error"
                    >
                        删除
                    </UiButton>
                </UiFormSubmit>
            </ChapterForm>,
            Footer: null
        }))
    }, [chapter])
    return (
        <li>
            <span onClick={onClick}>
                {chapter.order} - {chapter.name}
            </span>
            {children}
        </li>
    )
}

type CourseContextMenuRenderProps = React.PropsWithChildren<{
    context: CourseContentEntity,
    refetch: () => void,
    course: CourseEntity
}>
const CourseContextMenuRender = ({
    context,
    refetch,
    course
}: CourseContextMenuRenderProps) => {
    const [loading, setLoading] = useState(false);
    const [updContext] = useMutation(addContextMutation);
    const [delContext] = useMutation(delContextMutation);
    const onUpdContext = useCallback((destory: any, { order, chapterId, ...data }: any) => {
        setLoading(true);
        return updContext({
            variables: {
                order: parseInt(order),
                chapterId: parseInt(chapterId),
                id: context.id,
                ...data
            }
        }).then(() => {
            openInformationModal(() => ({ title: "修改成功" }))
            refetch();
            destory()
            return true;
        }).catch((e) => {
            openInformationModal(() => ({ title: "修改失败", children: e.message }))
            return false;
        }).finally(() => setLoading(false))
    }, [context]);
    const onDel = useCallback((destory: any) => {
        openModal(() => ({
            title: "删除章节",
            children: "删除后不可恢复，确认要删除吗？",
            onOk: () => {
                return delContext({
                    variables: {
                        id: context.id
                    }
                }).then(() => {
                    openInformationModal(() => ({ title: "删除成功" }))
                    destory()
                    refetch()
                    return true;
                }).catch((e) => {
                    openInformationModal(() => ({ title: "删除失败", children: e.message }))
                    return false;
                })
            }
        }))
    }, [context]);
    const onClick = useCallback(() => {
        openModal((destory) => ({
            title: "修改章节",
            children: <ContextForm
                onSubmit={onUpdContext.bind(null, destory)}
                defaultValue={context}
                loading={loading}
                course={course}
            >
                <UiFormSubmit>
                    <UiButton
                        className="ml-2"
                        onClick={onDel.bind(null, destory)}
                        color="error"
                    >
                        删除
                    </UiButton>
                </UiFormSubmit>
            </ContextForm>,
            Footer: null
        }))
    }, [context])
    return (
        <li>
            <span onClick={onClick}>
                {context.order} -
                {context.type === "PAID" && (
                    <LineHeightIcon />
                )}
                {context.name}
            </span>
        </li>
    )
}
export type CourseChapterContextProps = {
    data: CourseEntity
}
const CourseChapterContext = ({ data }: CourseChapterContextProps) => {
    const [chapterModal, openChapterModal, cancelChapterModal] = useModalEvent();
    const [contextModal, openContextModal, cancelContextModal] = useModalEvent();
    const {
        data: courseQuery,
        refetch
    } = useQuery<{ courseHashQuery: CourseEntity }>(CourseHashQuery, {
        variables: {
            hash_key: data.hash_key
        }
    })
    const [loading, setLoading] = useState(false);
    const [addChapter] = useMutation(addChapterMutation);
    const [addContext] = useMutation(addContextMutation);
    const course = useMemo(() => courseQuery?.courseHashQuery, [courseQuery]);
    const chapter = useMemo(() => {
        if (!!course) return [...(course.CourseChapter || [])];
        return []
    }, [course]);
    const onResult = useCallback((p: Promise<any>) => {
        setLoading(true);
        return p.then(() => {
            openInformationModal(() => ({ title: "添加成功" }))
            refetch()
            return true;
        }).catch((e) => {
            openInformationModal(() => ({ title: "添加失败", children: e.message }))
            return false;
        }).finally(() => {
            setLoading(false);
        })
    }, []);
    const onAddChapter = useCallback(({ order, ...data }: any) => {
        if (!course) return;
        return onResult(addChapter({
            variables: {
                order: parseInt(order),
                courseId: course.id,
                ...data
            }
        })).then(() => {
            cancelChapterModal()
            return true;
        })
    }, [course])
    const onAddContext = useCallback(({ order, chapterId, ...data }: any) => {
        return onResult(addContext({
            variables: {
                order: parseInt(order),
                chapterId: parseInt(chapterId),
                ...data
            }
        })).then(() => {
            cancelContextModal();
            return true;
        })
    }, []);
    if (!course) return (
        <div
            className="skeleton w-full h-96"
        />
    )
    return (
        <div>
            <div className="flex gap-2">
                <UiButton onClick={openChapterModal}>添加章节</UiButton>
                <UiButton onClick={openContextModal}>添加文章</UiButton>
                <UiModal
                    ref={chapterModal}
                >
                    <UiModalTitle>添加章节</UiModalTitle>
                    <ChapterForm
                        onSubmit={onAddChapter}
                        loading={loading}
                    />
                </UiModal>
                <UiModal
                    ref={contextModal}
                >
                    <UiModalTitle>添加文章</UiModalTitle>
                    <ContextForm
                        onSubmit={onAddContext}
                        loading={loading}
                        course={course}
                    />
                </UiModal>
            </div>
            <ul className="menu rounded-box z-10">
                {chapter.sort((a, b) => a.order - b.order).map((chapter) => {
                    const { id, CourseContent } = chapter
                    return (
                        <CourseChapterMenuRender
                            refetch={refetch}
                            chapter={chapter}
                            courseId={course.id}
                            key={id}
                        >
                            {!!CourseContent && (
                                <ul>
                                    {CourseContent.sort((a, b) => a.order - b.order).map((context) => {
                                        return (
                                            <CourseContextMenuRender
                                                key={context.id}
                                                context={context}
                                                course={course}
                                                refetch={refetch}
                                            />
                                        )
                                    })}
                                </ul>
                            )}
                        </CourseChapterMenuRender>
                    )
                })}
            </ul>
        </div>
    )
}
export default CourseChapterContext