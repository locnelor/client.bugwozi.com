import CourseEntity from "@/interfaces/CourseEntity"
import UserAvatar from "./UserAvatar"
import UiButton from "./ui/UiButton"
import { useCallback } from "react"
import UiModal, { UiModalTitle, openInformationModal, openModal, useModalEvent } from "./ui/UiModal"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import UiForm, { UiFormItem, UiFormSubmit } from "./ui/UiForm"
import UiInput from "./ui/UiInput"

const DelCourseHeadMutation = gql`
    mutation DelCourseHead($courseId:Int!,$userId:Int!){
        delHead(courseId:$courseId,userId:$userId){
            message
        }
    }
`
const AddCourseHeadMutation = gql`
    mutation AddCourseHead($courseId:Int!,$account:String!){
        addHead(courseId:$courseId,account:$account){
            message
        }
    }
`
export type CourseHeadProps = {
    data: CourseEntity,
    refetch?: () => void
}
const CourseHead = ({
    data,
    refetch
}: CourseHeadProps) => {
    const [delHead] = useMutation(DelCourseHeadMutation)
    const [addHead, { loading }] = useMutation(AddCourseHeadMutation, {
        onError(error) {
            openInformationModal(() => ({
                title: "添加失败",
                children: error.message
            }))
        },
        onCompleted() {
            cancelAddHeadModal()
            if (!!refetch) refetch()
        },
    })
    const [addHeadRef, openAddHeadModal, cancelAddHeadModal] = useModalEvent()
    const onClick = useCallback((userId: number) => {
        openModal(() => ({
            title: "删除负责人",
            children: "删除后无法恢复，确认要删除吗？",
            onOk: () => {
                return delHead({
                    variables: {
                        userId,
                        courseId: data.id
                    }
                }).then(() => {
                    if (!!refetch) refetch()
                    return true;
                }).catch((e) => {
                    openInformationModal(() => ({ title: "删除失败", children: e.message }))
                    return false;
                })
            }
        }))
    }, [data]);
    const onSubmit = useCallback(({ account }: any) => {
        addHead({
            variables: {
                courseId: data.id,
                account
            }
        })
    }, [data])
    return (
        <div>
            <UiButton onClick={openAddHeadModal}>添加负责人</UiButton>
            <UiModal
                ref={addHeadRef}
            >
                <UiModalTitle>添加负人</UiModalTitle>
                <UiForm
                    onSubmit={onSubmit}
                >
                    <UiFormItem label="负责人账号" name="account">
                        <UiInput required />
                    </UiFormItem>
                    <UiFormSubmit>
                        <UiButton loading={loading} submit>添加</UiButton>
                    </UiFormSubmit>
                </UiForm>
            </UiModal>
            <table className="table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>姓名</th>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody>
                    {data.head?.map((item, key) => (
                        <tr key={key}>
                            <th>{item.userId}</th>
                            <td><UserAvatar user={item.user} /></td>
                            <td><UiButton color="error" onClick={onClick.bind(null, item.userId)}>删除</UiButton></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default CourseHead