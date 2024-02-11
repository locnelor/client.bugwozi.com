import UiButton from "@/components/ui/UiButton"
import UiModal, { UiModalTitle } from "@/components/ui/UiModal"
import ClassesEntity from "@/interfaces/ClassesEntity"
import UserEntity from "@/interfaces/UserEntity"
import { gql, useMutation } from "@apollo/client"
import { useCallback, useRef, useState } from "react"


const ClassesRemoveMemberMutation = gql`
    mutation ClassesRemoveMember($ids:[Int!]!,$classesId:Float!){
        classesRemoveMember(ids:$ids,classesId:$classesId){
            message
        }
    }
`
const ClassesAddMemberMutation = gql`
    mutation ClassesAddMember($data:[[String!]!]!,$id:Float!){
        classesAddMember(data:$data,id:$id){
            message
        }
    }
`
const ClassesMembers = ({
    classes,
    power,
    refetch
}: { refetch: () => void, power: boolean, classes: ClassesEntity }) => {
    const ref = useRef<HTMLInputElement[]>([]);
    const [selected, setSelected] = useState<UserEntity[]>([]);
    const delModalRef = useRef<HTMLDialogElement>(null);
    const [delMember, { loading }] = useMutation(ClassesRemoveMemberMutation, {
        onError(error) {
            console.log(error, error.message)
        },
        onCompleted() {
            onCancel()
            refetch();
        },
    })
    const [addMember, { loading: addLoading }] = useMutation(ClassesAddMemberMutation, {
        onError(error, clientOptions) {
            console.log(error)
        },
        onCompleted(data, clientOptions) {
            refetch()
        },
    })
    const handleCheckboxRefs = useCallback((el: HTMLInputElement) => {
        if (el && !ref.current.includes(el)) {
            ref.current.push(el);
        }
    }, []);
    const onClick = useCallback(() => {
        delModalRef.current?.showModal()
        const selected = ref.current.filter(e => e.checked).map(({ value }) => classes.UserOnClasses?.[parseInt(value)].user) as UserEntity[];
        setSelected(selected)
    }, [classes]);
    const onCancel = useCallback(() => {
        delModalRef.current?.close()
    }, []);
    const onSubmit = useCallback(() => {
        delMember({
            variables: {
                ids: selected.map(e => e.id),
                classesId: classes.id
            }
        })
    }, [selected, classes]);
    const onInput = useCallback(() => {
        const input = document.createElement("input")
        input.type = "file"
        input.onchange = () => {
            const files = input.files;
            if (!files) return;
            const file = files[0];
            const reader = new FileReader();
            reader.onload = function (event) {
                const csvString = (event.target?.result || "").toString();
                const data = csvString.split("\n").map(e => e.split(","));
                addMember({
                    variables: {
                        data,
                        id: classes.id
                    }
                })
            };
            reader.readAsText(file);
        }
        input.accept = ".csv"
        input.click()
    }, [classes]);
    return (
        <div>
            <div className="flex gap-2">
                <UiButton loading={addLoading} onClick={onInput}>添加成员</UiButton>
                <UiButton onClick={onClick}>删除成员</UiButton>
                <UiModal
                    ref={delModalRef}
                >
                    <UiModalTitle>删除后不可恢复，确认要删除以下成员吗?</UiModalTitle>
                    <div className="flex flex-wrap gap-2">
                        {selected.map(({ id, name }) => (
                            <div key={id}>
                                {name}
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2 mt-2">
                        <UiButton onClick={onCancel}>
                            取消
                        </UiButton>
                        <UiButton loading={loading} onClick={onSubmit}>
                            确认
                        </UiButton>
                    </div>
                </UiModal>
            </div>
            <table className="table tables-zebra">
                <thead>
                    <tr>
                        <th></th>
                        <th>用户id</th>
                        <th>姓名</th>
                        <th>账号</th>
                        <th>是否管理员</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.UserOnClasses?.map(({ user, isAdmin }, key) => {
                        return (
                            <tr key={key}>
                                <th>
                                    <label>
                                        <input value={key} ref={handleCheckboxRefs} type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.account}</td>
                                <td>{isAdmin ? "是" : "否"}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default ClassesMembers