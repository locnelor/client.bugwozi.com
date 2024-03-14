"use client"
import UiButton from "@/components/ui/UiButton"
import UiDivider from "@/components/ui/UiDivider"
import UiForm, { UiFormItem, UiFormSubmit } from "@/components/ui/UiForm"
import UiInput from "@/components/ui/UiInput"
import UiModal, { UiModalTitle, openInformationModal, openModal, useModalEvent } from "@/components/ui/UiModal"
import { gqlError } from "@/lib/apollo-error"
import { useMutation, useQuery } from "@apollo/client"
import gql from "graphql-tag"
import { useCallback, useMemo } from "react"
import SaveBackup from "./SaveBackup"



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
const DelBackupMudation = gql`
    mutation DelBackup($name:String!){
        delBackup(name:$name)
    }
`
const HomeAdminBackupPage = () => {
    const { data, refetch } = useQuery<{
        getBackupList: string[]
    }>(GetBackupListQuery)
    const [backModal, openBackModal, cancelBackModal] = useModalEvent()
    const onCompleted = useCallback((title: string) => {
        return () => {
            refetch()
            openInformationModal(() => ({ title }))
            cancelBackModal()
        }
    }, [])
    const [delBackup] = useMutation(DelBackupMudation, {
        onCompleted: onCompleted("删除成功"),
        onError(error) {
            gqlError(error)
        },
    })
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
    const list = useMemo(() => data?.getBackupList || [], [data])


    const onSubmitBackup = useCallback(({ name }: any) => {
        savebackup({ variables: { name } })
    }, [])
    const onDelBackup = useCallback((name: string) => {
        openModal(() => ({
            onOk: () => {
                delBackup({ variables: { name } })
                return true;
            },
            title: "删除后无法恢复，确认要删除吗？"
        }))
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
                            <td>操作</td>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((name, key) => (
                            <tr key={key}>
                                <td>
                                    {name}
                                </td>
                                <td>
                                    <UiButton onClick={onDelBackup.bind(null, name)}>
                                        删除
                                    </UiButton>
                                </td>
                                <td>
                                    <SaveBackup name={name} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default HomeAdminBackupPage