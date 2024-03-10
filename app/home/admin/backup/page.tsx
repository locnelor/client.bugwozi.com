"use client"
import UiButton from "@/components/ui/UiButton"
import UiDivider from "@/components/ui/UiDivider"
import UiForm, { UiFormItem, UiFormSubmit } from "@/components/ui/UiForm"
import UiInput from "@/components/ui/UiInput"
import UiModal, { UiModalTitle, openInformationModal, useModalEvent } from "@/components/ui/UiModal"
import { gqlError } from "@/lib/apollo-error"
import { useMutation, useQuery } from "@apollo/client"
import gql from "graphql-tag"
import { useCallback, useMemo } from "react"



const GetBackupListQuery = gql`
    query GetbackupList{
        getBackupList
    }
`
const SaveBackupMutation = gql`
    mutation SaveBackup($name:String){
        saveBackup(name:$name)
    }
`
const HomeAdminBackupPage = () => {
    const { data, refetch } = useQuery(GetBackupListQuery)
    const [backModal, openBackModal, cancelBackModal] = useModalEvent()
    const [savebackup] = useMutation(SaveBackupMutation, {
        onCompleted() {
            refetch()
            openInformationModal(() => ({ title: "备份成功" }))
            cancelBackModal()
        },
        onError(error) {
            gqlError(error)
        },
    })
    const list = useMemo(() => data?.getBackupList, [data])


    const onSubmitBackup = useCallback(({ name }: any) => {
        savebackup({ variables: { name } })
    }, [])
    return (
        <div>
            <UiButton onClick={openBackModal}>
                创建备份
            </UiButton>
            <UiModal
                ref={backModal}
            >
                <UiModalTitle>创建备份</UiModalTitle>
                <UiForm
                    onSubmit={onSubmitBackup}
                >
                    <UiFormItem
                        label="备份名"
                        name="name"
                    >
                        <UiInput />
                    </UiFormItem>
                    <UiFormSubmit>
                        <UiButton submit>
                            提交
                        </UiButton>
                    </UiFormSubmit>
                </UiForm>
            </UiModal>
            <UiDivider />
            <div className="max-w-96">
                <table className="table">
                    <thead>
                        <tr>
                            <td>备份名称</td>
                            <td>操作</td>
                        </tr>
                    </thead>
                    <tbody>
                        {JSON.stringify(list)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default HomeAdminBackupPage