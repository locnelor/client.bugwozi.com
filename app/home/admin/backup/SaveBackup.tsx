import UiButton from "@/components/ui/UiButton"
import UiInput from "@/components/ui/UiInput";
import UiModal, { UiModalTitle, openInformationModal, openModal, useModalEvent } from "@/components/ui/UiModal";
import { gqlError } from "@/lib/apollo-error";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useCallback, useState } from "react"


const GetBackupFilesMutation = gql`
    mutation GetBackupFiles($name:String!){
        getBackupFiles(name:$name)
    }
`
const SaveBackupFileMutation = gql`
    mutation SaveBackupFile($name:String!,$hash_key:String!){
        saveBackupFile(name:$name,hash_key:$hash_key)
    }
`
const SaveBackup = ({
    name = ""
}) => {
    const [getFiles, { data }] = useMutation(GetBackupFilesMutation)
    const [ref, open] = useModalEvent()
    const [value, setValue] = useState("");
    const [save] = useMutation(SaveBackupFileMutation, {
        onCompleted() {
            openInformationModal(() => ({ title: "恢复成功" }))
        },
        onError(error) {
            gqlError(error)
        },
    })
    const onClick = useCallback(() => {
        open()
        if (!!data) return;
        getFiles({ variables: { name } })
    }, [data]);
    const onSave = useCallback((hash_key: string) => {
        openModal(() => ({
            title: "恢复后，会彻底丢失恢复之前的数据，是否要恢复？",
            onOk() {
                save({
                    variables: {
                        name,
                        hash_key
                    }
                })
                return true;
            }
        }))
    }, []);
    return (
        <div>
            <UiButton onClick={onClick}>
                恢复
            </UiButton>
            <UiModal
                ref={ref}
            >
                <UiModalTitle>恢复 - {name}</UiModalTitle>
                <UiInput
                    value={value}
                    onChange={({ target: { value } }) => setValue(value)}
                />
                <div className=" h-96 overflow-y-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>哈希</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.getBackupFiles?.filter((e: string) => !value || e.includes(value)).map((hash: string) => (
                                <tr key={hash}>
                                    <td>{hash}</td>
                                    <td>
                                        <UiButton onClick={onSave.bind(null, hash)}>
                                            恢复
                                        </UiButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </UiModal>
        </div>
    )
}
export default SaveBackup